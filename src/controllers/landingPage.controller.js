import * as recomendedProduct from "../models/landingPage.models.js"

export async function getRecomendedProductController(req, res) {
    const { rows } = await recomendedProduct.recomendedProductModels()

    return res.json({
        success: true,
        message: "All Product",
        result: rows
    })
}

export async function getTestimoniController(req, res) {
    const { rows } = await recomendedProduct.testimoniModels()

    return res.json({
        success: true,
        message: "All Testimoni",
        result: rows
    })
}