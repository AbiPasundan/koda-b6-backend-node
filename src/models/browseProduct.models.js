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

export async function addToCartModels(data) {
	const queryAddToCartModels = `
		WITH insert_cart AS (
			INSERT INTO carts (user_id)
			VALUES ($1)
			ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id 
			RETURNING cart_id
		),
		current_cart AS (
			SELECT cart_id FROM insert_cart
			UNION ALL
			SELECT cart_id FROM carts WHERE user_id = $1
			LIMIT 1
		)
		INSERT INTO cart_items (cart_id, product_id, quantity, product_name, base_price, variant_name, size_name)
		SELECT cart_id, $2, $3, $4, $5, $6, $7 
		FROM current_cart
		ON CONFLICT (cart_id, product_id, variant_name, size_name)
		DO UPDATE SET
			quantity = cart_items.quantity + EXCLUDED.quantity;	
	`
	try {
		await query('BEGIN')

		// await query(queryAddToCartModels, [id])
		await query(queryAddToCartModels, [
			data.user_id,
			data.product_id,
			data.quantity,
			data.product_name,
			data.base_price,
			data.variant_name,
			data.size_name
		])

		await query('COMMIT')
	} catch (error) {
		await query('ROLLBACK')
		throw error
	}
}

export async function getCartModels(id) {
	// cart_item_id, product_id, product_name, variant_name, size_name, base_price, quantity, discount_rate, normal_price, discount_price, image_path
	const queryGetCartModels = `
	SELECT 
		ci.cart_item_id,
		ci.product_id,
		ci.product_name,
		ci.variant_name,
		ci.size_name,
		ci.base_price,
		ci.quantity,
		d.discount_rate,
		(ci.base_price * ci.quantity) AS norma_price,
		((ci.base_price - (ci.base_price * COALESCE(d.discount_rate, 0) / 100)) * ci.quantity) AS discount_price,
		pi.path AS image_path
	FROM 
		carts c
	JOIN 
		cart_items ci ON c.cart_id = ci.cart_id
	LEFT JOIN 
		product_images pi ON ci.product_id = pi.product_id
	JOIN 
		products p ON ci.product_id = p.id
	LEFT JOIN 
		discount d ON p.discount = d.discount_id
	WHERE 
		c.user_id = $1;
	`

	const getCart = await query(queryGetCartModels, [id])

	return getCart
}