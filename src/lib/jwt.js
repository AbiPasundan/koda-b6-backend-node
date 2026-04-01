import jwt from "jsonwebtoken"

// Use environment variables for security reasons
const SECRET = process.env.JWT_SECRET_KEY || 'd8e8fca2dc0f896fd7cb4cb0031ba249';

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
// const user = { userId: 12, username: 'johndoe' };
// const token = generateToken(user);
// console.log('Generated Token:', token);
