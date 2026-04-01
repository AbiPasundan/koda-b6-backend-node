import { db } from "../lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}

export async function recomendedProductModels() {
    const queryRecomendedProduct = `
        SELECT
            p.id,
            p.product_name,
            p.product_desc,
            p.price,
            product_images.path,
            reviews.ratings
        FROM products p
        LEFT JOIN product_images ON p.id = product_images.product_images_id
        LEFT JOIN reviews ON p.id = reviews.review_id
        WHERE p.id > 5
        LIMIT 4;
    `
    const rekomendedProduct = await query(queryRecomendedProduct)

    return rekomendedProduct
}

export async function testimoniModels() {
    const queryTestimoniModels = `
        SELECT
            users.full_name,
            users.pictures,
            reviews.messages,
            reviews.ratings
        FROM reviews
        INNER JOIN users ON users.id = reviews.user_id
        WHERE reviews.ratings >= 4
        LIMIT 3;
    `
    const testimoniProduct = await query(queryTestimoniModels)

    return testimoniProduct
}