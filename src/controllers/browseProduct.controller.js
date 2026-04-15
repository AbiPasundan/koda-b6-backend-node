import * as browseProduct from "#/models/browseProduct.models.js"
import ResponseOk, { ResponseErr404 } from "#/helper/response.helper.js";
import redisClient from "#/lib/redis.js";

export async function getBrowseController(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const cacheKey = `products:page=${page}:limit=${limit}`;

        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return ResponseOk(res, 200, "success get data product (cache)", JSON.parse(cachedData), [
                { rel: "self", href: "/browseproducts", method: "GET" },
                { rel: "next", href: "/browseproduct?page=2", method: "GET" },
                { rel: "prev", href: "/browseproduct?page=1", method: "GET" },
                { rel: "first", href: "/browseproduct", method: "GET" },
                { rel: "related", href: `/detailproduct/{id}`, method: "GET" },
            ]);
        }

        const products = await browseProduct.browseProductModels(page, limit);

        await redisClient.setEx(
            cacheKey,
            900,
            JSON.stringify(products.rows)
        );

        return ResponseOk(res, 200, "success get data product", rows, [
            { rel: "self", href: "/browseproducts", method: "GET" },
            { rel: "next", href: "/browseproduct?page=2", method: "GET" },
            { rel: "prev", href: "/browseproduct?page=1", method: "GET" },
            { rel: "first", href: "/browseproduct", method: "GET" },
            { rel: "related", href: `/detailproduct/{id}`, method: "GET" },
        ]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
            return ResponseErr404(res, {
                errors: "Product not found",
                links: [
                    { rel: "collection", href: "/browseproduct" },
                    { rel: "search", href: `/detailproduct/${id}` },
                    { rel: "help", href: "/docs/" }
                ]
            });
        }

        return ResponseOk(res, 200, "Product detail retrieved", rows, [
            { rel: "self", href: `/detailproduct/${rows.id}`, method: "GET" },
            { rel: "collection", href: `/browseproduct/${rows.id}`, method: "GET" },
            { rel: "related", href: `/detailproduct/addcart`, method: "POST" },
        ]);

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