import jwt from "jsonwebtoken"
import { constants } from "node:http2"
import { GenerateHash, VerifyHash } from "#/lib/hash.js"
import { generateToken } from "#/lib/jwt.js"
import * as userModel from "#/models/users.models.js"
import * as forgot_password from "#/models/forgot_password.models.js"
import ResponseOk, { ResponseErr, ResponseErr400, ResponseErr500 } from "#/helper/response.helper.js"

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

        const token = generateToken({ id: user.id, role_name: user.role_name })
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

        return ResponseOk(res, 201, "User registered successfully", user,
            [
                { rel: "self", href: `/auth/register`, method: "POST" },
                { rel: "login", href: "/auth/login", method: "POST" },
            ]);

    } catch (err) {
        console.error(err);
        ResponseErr(res, {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            message: err.message,
            errors: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        })
    }
}

export async function requestForgotPasswordController(req, res) {
    function generateKode() {
        const char = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let res = '';

        for (let i = 0; i < 4; i++) {
            const indeksAcak = Math.floor(Math.random() * char.length);
            res += char[indeksAcak];
        }

        return res;
    }

    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {

        const _ = await forgot_password.requestForgotPasswordModels(decoded?.id, generateKode());

        return ResponseOk(res, 201, true, "Successfully Send Otp", {});

    } catch (err) {
        console.error(err);
        ResponseErr(res, {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            message: err.message,
            errors: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        })
    }
}

export async function resetPasswordController(req, res) {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return ResponseErr400(res, {
                errors: "Token and password are required",
                links: [
                    { rel: "self", href: "/reset-password", method: "POST" },
                ]
            });
        }

        const hashedPassword = await GenerateHash(password);

        await forgot_password.resetPasswordByTokenModels(token, hashedPassword);

        return ResponseOk(res, 201, "Password successfully reset", null, [
            { rel: "self", href: "/reset-password", method: "POST" },
        ]);

    } catch (error) {
        return ResponseErr500(res, {
            error,
            links: [
                { rel: "self", href: "/reset-password", method: "POST" },
            ]
        });
    }
}
