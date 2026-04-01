import { db } from "../lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}


export async function getAllProducts() {
    const getProducts = await query("SELECT * FROM products")

    return getProducts
}

export async function getProductById(id) {
    const result = await query("SELECT * FROM products WHERE id = $1", [id])
    if (result.rows.length === 1) {
        return result.rows[0]
    } else {
        throw new Error("Product not found")
    }
}