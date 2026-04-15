import * as browseProduct from "#/models/browseProduct.models.js"
import ResponseOk from "#/helper/response.helper.js";

export async function getBrowseController(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const products = await browseProduct.browseProductModels(page, limit);

        ResponseOk(res, 200, true, "success get data product", products.rows)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export async function getDetailProductController(req, res) {
    const { id: idStr } = req.params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format",
        });
    }

    try {
        const { rows } = await browseProduct.detailProductModels(id);

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product found",
            result: rows
        });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            result: error.message
        });
    }
}

export async function addToCartController(req, res) {
    const data = req.body
    try {
        const user = await browseProduct.addToCartModels(data)
        res.status(201).json({
            success: true,
            message: "Success Add to cart",
            result: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to add to cart",
            result: null
        })
    }
}

export async function getCartController(req, res) {
    const { id: idStr } = req.params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format",
        });
    }

    try {
        const { rows } = await browseProduct.getCartModels(id);

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product found",
            result: rows
        });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            result: error.message
        });
    }
}