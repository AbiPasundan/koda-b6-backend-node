import { db } from "#/lib/db.js"

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} password
*/



const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}

/**
 * @type {User[]}
*/

export async function getProfile() {
    const getAllUsers = await query("SELECT * FROM users")

    return getAllUsers
}