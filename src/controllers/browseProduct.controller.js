import * as browseProduct from "#/models/browseProduct.models.js"

export async function getBrowseController(req, res) {
    const { rows } = await browseProduct.browseProductModels()

    return res.json({
        success: true,
        message: "All Product",
        result: rows
    })
}

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