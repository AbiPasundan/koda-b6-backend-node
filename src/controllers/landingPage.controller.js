import * as recomendedProduct from "../models/landingPage.models.js"

export async function getRecomendedProductController(req, res) {
    const { rows } = await recomendedProduct.recomendedProductModels()

    return res.json({
        success: true,
        message: "All users",
        result: rows
    })
}