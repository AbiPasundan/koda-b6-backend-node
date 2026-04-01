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

export async function createProducts(data) {
    const queryInsert = `INSERT INTO products (product_name, product_desc, price, quantity, discount) VALUES ($1, $2, $3, $4, $5)`

    const val = [
        data.product_name,
        data.product_desc,
        data.price,
        data.quantity,
        data.discount,
    ]

    const newProduct = await query(queryInsert, val)
    return newProduct.rows[0];
}

// 

export async function deleteProduct(id) {
    const result = await query("DELETE FROM products WHERE id = $1 RETURNING *", [id])
    if (result.rows.length === 1) {
        return result.rows[0]
    } else {
        throw new Error("Product not found")
    }
}
