import { constants } from "node:http2"

export default function ResponseOk(res, code, status, message, data) {
    res.status(code).json({
        success: status,
        message: message,
        data,
    })
}