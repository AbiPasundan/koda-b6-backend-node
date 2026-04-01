
import * as productsModel from "#/models/products.models.js"

export async function getAllProducts(req, res) {
    const { rows } = await productsModel.getAllProducts()

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const users = rows.slice(offset, offset + limit)

    return res.json({
        success: true,
        message: "All users",
        result: users
    })
}
