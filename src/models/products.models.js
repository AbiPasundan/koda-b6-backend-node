import { db } from "../lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}


export async function getAllProducts() {
    const getProducts = await query("SELECT * FROM products")

    return getProducts
}