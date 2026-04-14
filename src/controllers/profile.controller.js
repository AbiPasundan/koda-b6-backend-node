import jwt from "jsonwebtoken"
import * as userModel from "#/models/users.models.js"
import * as profileModel from "#/models/profile.models.js"
import { GenerateHash } from "#/lib/hash.js"
/**
 * 
 * @param {import("express").Request} req 
 * @param { import("express").Response} res
*/

export async function getProfile(req, res) {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token missing",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token payload",
            });
        }

        const user = await userModel.getUserById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            result: user,
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message,
        });
    }
}

export async function updateProfile(req, res) {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token missing",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token payload",
            });
        }
        
        const body = req.body || {};

        let full_name = body.full_name || null;
        let email = body.email || null;
        let password = body.password || null;
        let address = body.address || null;
        let phone = body.phone || null;
        let pictures = req.file ? req.file.filename : null;

        if (password) {
            password = await GenerateHash(password);
        }

        const user = await profileModel.updateProfile(full_name, email, password, address, phone, pictures, decoded.id);

        if (!user) {
            return res.status(501).json({
                success: false,
                message: "Failed Update Profile",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            result: user
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message,
        });
    }
}