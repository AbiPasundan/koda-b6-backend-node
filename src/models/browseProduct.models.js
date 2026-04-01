import { db } from "../lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}


export async function browseProductModels() {
    const queryBrowseProductModels = `
        select
            id,
            product_name,
            product_desc,
            price,
            quantity,
            discount,
            discount.is_flash_sale
        from products
        left join discount on products.id = discount.discount_id
    `
    const browseProduct = await query(queryBrowseProductModels)

    return browseProduct
}

export async function detailProductModels(id) {
    const queryDetailProductModels = `
    SELECT
		p.*,

		d.discount_rate,
		d.is_flash_sale,

		(SELECT JSON_AGG(path)
		FROM product_images
		WHERE product_id = p.id) AS images,

		(SELECT JSON_AGG(
			JSON_BUILD_OBJECT(
				'size_name', size_name,
				'size_price', size_price
			)
		)
		FROM product_size
		WHERE product_id = p.id) AS sizes,

		(SELECT JSON_AGG(
			JSON_BUILD_OBJECT(
				'variant_name', variant_name,
				'add_price', add_price
			)
		)
		FROM product_variant
		WHERE product_id = p.id) AS variants,

		(SELECT AVG(ratings)
		FROM reviews
		WHERE product_id = p.id) AS rating

	FROM products p
	LEFT JOIN discount d ON p.id = d.discount_id
    WHERE p.id = $1;
    `
    const detailProduct = await query(queryDetailProductModels, [id])

    return detailProduct
}