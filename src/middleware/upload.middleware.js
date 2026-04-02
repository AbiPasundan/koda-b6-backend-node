import constants from "http2";
import multer from "multer";
import { customAlphabet, nanoid } from "nanoid";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const storage = path => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path || './src/lib')
    },
    filename: function (req, file, cb) {
        const newFile = nanoid()
        const ext = path.extname(file.originalname);
        cb(null, `${newFile}.${ext}`)
    }
})

export default function uploadMiddleware(path) {
    return multer({
        storage: storage(path),
        limits: {
            fileSize: 10 * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            // const ext = file.originalname.split('.').pop()
            const ext = path.extname(file.originalname).toLowerCase();
            const allowedTypes = /jpeg|jpg|png/;
            const mimeType = allowedTypes.test(file.mimetype);
            if (mimeType && allowedTypes.test(ext)) {
                return cb(null, true);
            }
            cb(new Error("Error: File type not supported!"));
        }
    })
}