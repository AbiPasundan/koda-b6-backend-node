import multer from "multer";
import { customAlphabet, nanoid } from "nanoid";

const nanoid = customAlphabet('1234567890abcdef', 10)

const storage = path => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/src/lib')
    },
    filename: function (req, file, cb) {
        // buatkan proses untuk generate filename mengambuk ekstensi
        const newFile = nanoid
        // const ext = file.originalname.split('.').pop()
        const ext = file.originalname.split('.').pop()
        cb(null, `${newFile}.${ext}`)
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export default function uploadMiddleware(path) {
    return multer({
        storage: storage(path),
        limits: {
            fileSize: 10 * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()
        }
    })
}