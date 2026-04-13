import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET;

/**
 * @typedef {Object} Payload
 * @param {number} id
 * @returns {string}
 */

export function generateToken(userPayload) {
    const token = jwt.sign(
        userPayload,
        SECRET,
        { expiresIn: '1h' }
    );
    return token;
}


/**
 * 
 * @param {string} token
 * @returns {Payload}
 */

export function verifyToken(token) {
    try {
        const payload = jwt.verify(token, SECRET)
        return payload
    } catch (error) {
        console.log(error)
    }
}
