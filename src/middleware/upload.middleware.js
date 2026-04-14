import multer from "multer";
import path from "path";
import { customAlphabet } from "nanoid";
import fs from "fs";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads", { recursive: true });
}

const storage = (uploadPath = "./uploads") =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const id = nanoid();
            const ext = path.extname(file.originalname);
            cb(null, `${id}${ext}`);
        }
    });

export default function uploadMiddleware(uploadPath) {
    return multer({
        storage: storage(uploadPath),
        limits: {
            fileSize: 10 * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg"
            ];

            const ext = path.extname(file.originalname).toLowerCase();

            const allowedExt = [".jpg", ".jpeg", ".png"];

            if (
                allowedMimeTypes.includes(file.mimetype) &&
                allowedExt.includes(ext)
            ) {
                return cb(null, true);
            }

            cb(new Error("File type not supported! Only JPG, JPEG, PNG allowed."));
        }
    });
}