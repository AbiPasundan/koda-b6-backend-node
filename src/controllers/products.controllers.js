
import * as productsModel from "#/models/products.models.js"
import invalidateProductCache from "#/helper/invalidateRedis.helper.js"
import ResponseOk, { ResponseErr } from "#/helper/response.helper.js"

export async function getAllProducts(req, res) {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    page = (isNaN(page) || page < 1) ? 1 : page;
    limit = (isNaN(limit) || limit < 1) ? 10 : limit;

    const offset = (page - 1) * limit;

    try {
        const rows = await productsModel.getAllProducts(limit, offset);
        
        ResponseOk(res, 200, true, "All Product", rows);
    } catch (error) {
        ResponseErr(res, 500, false, "Internal Server Error");
    }
}

export async function getProductById(req, res) {
    const { id: idStr } = req.params
    const id = parseInt(idStr)
    try {
        const data = await productsModel.getProductById(id)
        ResponseOk(res, 200, true, "Product found", data)
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

    await invalidateProductCache();

    ResponseOk(res, 201, true, "Product Created", product)
}

export async function deleteProduct(req, res) {
    try {
        const id = parseInt(req.params.id)
        const product = await productsModel.deleteProduct(id)

        await invalidateProductCache();

        ResponseOk(res, 204, true, "Product deleted", product)
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            result: null
        })
    }
}