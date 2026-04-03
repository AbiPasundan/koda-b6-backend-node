import { constants } from "node:http2"
import * as orderModel from "#/models/order.models.js"


export async function getOrderController(req, res) {
    const { rows } = await orderModel.getOrdersModels()

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const order = rows.slice(offset, offset + limit)

    return res.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "All order",
        result: order
    })
}

export async function checkoutCartController(req, res) {
}