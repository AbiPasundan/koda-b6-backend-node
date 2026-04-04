// import { constants } from "constants"

import { verifyToken } from "../lib/jwt.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

export default function auth(requiredRole = null) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization
        const prefix = "Bearer "

        if (!authHeader || !authHeader.startsWith(prefix)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                result: null
            })
        }

        const token = authHeader.slice(prefix.length)
        console.log(token);
        

        try {
            const payload = verifyToken(token)
            console.log(payload);

            if (!payload) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid token",
                    result: null
                })
            }

            res.locals.user = payload
            if (requiredRole && payload.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: insufficient role",
                    result: null
                })
            }

            next()
        } catch (err) {
            console.log(err);
            return res.status(403).json({
                success: false,
                message: "Token verification failed",
                result: null
            })
        }
    }
}