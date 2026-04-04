import { constants } from "node:http2"
import * as orderModel from "#/models/order.models.js"
import jwt from "jsonwebtoken";


export async function getOrderController(req, res) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    const decode = jwt.decode(token)
    const {id} = decode
    console.log(decode);
    console.log(id);
    

    const { rows } = await orderModel.getOrdersModels(id)

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