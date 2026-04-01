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