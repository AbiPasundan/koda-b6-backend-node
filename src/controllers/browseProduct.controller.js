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

// test with this shit
// {
// 	"user_id": 1,
// 	"product_id": 7,
// 	"quantity": 3,
// 	"product_name": "euy",
// 	"base_price": 1000,
// 	"variant_name": "sweet variant",
// 	"size_name": "no size"
// }