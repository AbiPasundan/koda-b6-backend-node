import * as browseProduct from "#/models/browseProduct.models.js"
import ResponseOk, { ResponseErr400, ResponseErr404, ResponseErr500 } from "#/helper/response.helper.js";
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
        return ResponseErr500(res, {
            error,
            links: [
                { rel: "self", href: "/browseproducts", method: "GET" },
            ]
        });
    }
}

export async function getDetailProductController(req, res) {
    const { id: idStr } = req.params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
        return ResponseErr400(res, {
            errors: "Invalid product ID format",
            links: [
                { rel: "self", href: "/detailproduct/addcart" },
            ]
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
        return ResponseErr500(res, {
            error,
            links: [
                { rel: "self", href: "/detailproduct/${id}", method: "GET" },
            ]
        });
    }
}

export async function addToCartController(req, res) {
    const data = req.body
    try {
        const user = await browseProduct.addToCartModels(data)
        return ResponseOk(res, 200, "Success Add to cart", user, [
            { rel: "self", href: "/detailproduct/addcart", method: "POST" },
        ]);
    } catch (error) {
        return ResponseErr500(res, {
            errors: "bad request",
            links: [
                { rel: "self", href: "/detailproduct/addcart" },
            ]
        });
    }
}

export async function getCartController(req, res) {
    const { id: idStr } = req.params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
        return ResponseErr400(res, {
            errors: "Invalid product ID format",
            links: [
                { rel: "self", href: "/detailproduct/addcart/:id", method: "GET" },
            ]
        });
    }
    try {
        const { rows } = await browseProduct.getCartModels(id);

        if (!rows || rows.length === 0) {
            return ResponseErr404(res, {
                errors: "Product not found",
                links: [
                    { rel: "self", href: "/detailproduct/addcart/:id", method: "GET" },
                ]
            });
        }

        return ResponseOk(res, 200, "success get data cart", rows, [
            { rel: "self", href: "/detailproduct/addcart/:id", method: "GET" },
        ]);
    } catch (error) {
        console.error("Database Error:", error);
        const message = (error + "Internal server error")
        return ResponseErr500(res, {
            error: message,
            links: [
                { rel: "self", href: "/detailproduct/${id}", method: "GET" },
            ]
        });
    }
}