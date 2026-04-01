import { GenerateHash } from "../lib/hash.js"
import * as userModel from "../models/users.models.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

// users?page=1&limit=5

export async function getAllUsers(req, res) {
    const { rows } = await userModel.getAllUsers()

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const users = rows.slice(offset, offset + limit)

    return res.json({
        success: true,
        message: "All users",
        result: users
    })
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function createUser(req, res) {
    const data = req.body
    if (data.password) {
        // const { GenerateHash } = await import("../lib/hash.js")
        data.password = await GenerateHash(data.password)
        console.log(data.password);
    }
    const user = await userModel.createUser(data)
    res.status(201).json({
        success: true,
        message: "User created",
        result: user
    })
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function getUserById(req, res) {
    const { id: idStr } = req.params
    const id = parseInt(idStr)
    const data = await userModel.getUserById(id)
    try {
        res.status(200).json({
            success: true,
            message: "User found",
            result: data
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            result: error.message
        })
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function updateUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const user = await userModel.updateUser(id, data)
        res.json({
            success: true,
            message: "User updated",
            result: user
        })
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
 * @param {import("express").Response} res 
 */

export async function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id)
        const user = await userModel.deleteUser(id)
        res.json({
            success: true,
            message: "User deleted",
            result: user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            result: null
        })
    }
}