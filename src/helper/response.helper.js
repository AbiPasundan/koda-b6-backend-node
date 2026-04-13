export default function ResponseOk(res, code, status, message, data) {
    res.status(code).json({
        success: status,
        message: message,
        data,
    })
}

export function ResponseErr(res, { code, message, errors, links }) {
    res.status(code).json({
        success: false,
        message,
        errors,
        links
    })
}