import * as browseProduct from "#/models/browseProduct.models.js"

export async function getBrowseController(req, res) {
    const { rows } = await browseProduct.browseProductModels()

    return res.json({
        success: true,
        message: "All Product",
        result: rows
    })
}