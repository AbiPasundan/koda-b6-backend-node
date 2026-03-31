import * as userModel from "../models/users.models.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param { import("express").Response} res
*/

export async function login(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
            result: null
        })
    }
    
    const { email, password } = req.body

    try {
        const user = await userModel.getUserByEmail(email)
        if (user.password === password) {
            res.status(200).json({
                success: true,
                message: "Login successfull",
                result: user
            })
        } else {
            throw new Error("Invalid password")
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            result: null
        })
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param { import("express").Response} res
*/
export async function register(req, res) {
    const data = req.body
    const user = await userModel.createUser(data)

    res.json({
        success: true,
        message: "User created",
        result: user
    })
    res.status(400).json({
        success: false,
        message: error.message,
        result: null
    })
}