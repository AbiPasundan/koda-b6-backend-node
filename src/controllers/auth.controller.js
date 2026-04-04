import { constants } from "node:http2"
import { GenerateHash, VerifyHash } from "#/lib/hash.js"
import { generateToken } from "../lib/jwt.js"
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

        if (!user) {
            return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isValid = await VerifyHash(user.password, password)

        if (!isValid) {
            return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = generateToken({ id: user.id, role_id: user.role_id })
        // console.log(token);
        // console.log(user);
        // console.log(user.id);
        // console.log(user.role_id);
        

        const { password: _, ...userWithoutPassword } = user

        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Login successful",
            data: {
                ...userWithoutPassword,
                token
            }
        })
    } catch (error) {
        console.log(error);
        console.log(error.message);
        
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
    if (data.password) {
        data.password = await GenerateHash(data.password)
    }
    const user = await userModel.createUser(data)

    res.json({
        success: true,
        message: "User created",
        result: user
    })
    // res.status(400).json({
    //     success: false,
    //     message: "error.message",
    //     result: null
    // })
}