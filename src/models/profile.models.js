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

export async function updateProfile(name, email, password, address, phone, pictures, id) {
    const queryUpdate = `UPDATE users SET full_name = COALESCE($1, full_name), email = COALESCE($2, email), password = COALESCE($3, password), address = COALESCE($4, address), phone = COALESCE($5, phone), pictures = COALESCE($6, pictures) WHERE id = $7 RETURNING id, full_name, email, password, address, phone, pictures`
    const updateUser = await query(queryUpdate, [name, email, password, address, phone, pictures, id])

    if (updateUser.rows.length > 0) {
        return updateUser.rows[0]
    } else {
        throw new Error("User not found")
    }
}