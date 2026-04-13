import { constants } from "node:http2"
import { GenerateHash, VerifyHash } from "#/lib/hash.js"
import { generateToken } from "../lib/jwt.js"
import * as userModel from "../models/users.models.js"
import ResponseOk, { ResponseErr } from "#/helper/response.helper.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param { import("express").Response} res
*/

export async function login(req, res) {
    if (!req.body.email || !req.body.password) {
        return ResponseErr(res, {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            message: "Email and password are required",
            errors: constants.HTTP_STATUS_BAD_REQUEST,
        })
    }

    const { email, password } = req.body

    try {
        const user = await userModel.getUserByEmail(email)

        if (!user) {
            return ResponseErr(res, {
                code: constants.HTTP_STATUS_BAD_REQUEST,
                message: "User not found",
                errors: constants.HTTP_STATUS_BAD_REQUEST,
            })
        }

        const isValid = await VerifyHash(user.password, password)

        if (!isValid) {
            return ResponseErr(res, {
                code: constants.HTTP_STATUS_BAD_REQUEST,
                message: "Invalid email or password",
                errors: constants.HTTP_STATUS_BAD_REQUEST,
            })
        }

        const token = generateToken({ id: user.id, role_id: user.role_id })
        res.set('Authorization', `Bearer ${token}`);

        const { password: _, ...userWithoutPassword } = user

        ResponseOk(res, constants.HTTP_STATUS_OK, true, "Login successful", {
            ...userWithoutPassword,
            token
        })
    } catch (error) {
        console.log(error);
        console.log(error.message);

        ResponseErr(res, {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            message: error.message,
            errors: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        })
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param { import("express").Response} res
*/

export async function register(req, res) {
    try {
        const data = req.body;

        const errors = {};
        if (!data.email) errors.email = "Email is required";
        if (!data.password) errors.password = "Password is required";

        if (Object.keys(errors).length > 0) {
            return Err.validation(res, errors);
        }

        data.password = await GenerateHash(data.password);

        const user = await userModel.createUser(data);

        return ResponseOk(res, 201, true, "User registered successfully", {
            user,
        });

    } catch (err) {
        console.error(err);
        ResponseErr(res, {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            message: err.message,
            errors: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        })
    }
}