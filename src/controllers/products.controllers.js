
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


export async function getProductById(req, res) {
    const { id: idStr } = req.params
    const id = parseInt(idStr)
    const data = await productsModel.getProductById(id)
    try {
        res.status(200).json({
            success: true,
            message: "Product found",
            result: data
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product not found",
            result: error.message
        })
    }
}

export async function createProduct(req, res) {
    const data = req.body
    const product = await productsModel.createProducts(data)
    res.status(201).json({
        success: true,
        message: "Product created",
        result: product
    })
}

// 

export async function deleteProduct(req, res) {
    try {
        const id = parseInt(req.params.id)
        const product = await productsModel.deleteProduct(id)
        res.json({
            success: true,
            message: "Product Deleted",
            result: product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            result: null
        })
    }
}