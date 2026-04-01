import { db } from "../lib/db.js"

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

export async function getAllUsers() {
    const getAllUsers = await query("SELECT * FROM users")

    return getAllUsers
}

export async function getUserById(id) {
    const result = await query("SELECT * FROM users WHERE id = $1", [id])
    if (result.rows.length === 1) {
        return result.rows[0]
    } else {
        throw new Error("User not found")
    }
}

/**
 * 
 * @param {User} data
*/
export async function createUser(data) {
    const register = await query("SELECT * FROM users WHERE email = $1", [data.email]);

    if(register.rows.length > 0){
        throw new Error("Email already registered");
    }

    const queryRegister = `INSERT INTO users (full_name, email, password, role_id) VALUES ($1, $2, $3, $4)`

    const val = [
        data.full_name,
        data.email,
        data.password,
        2,
    ]

    const newUser = await query(queryRegister, val)
    return newUser.rows[0];
}

// /**
//  * 
//  * @param {User} data
//  * @param {function} data
// */

export async function getUserByEmail(email, cb) {
    const result = await query("SELECT * FROM users WHERE email = $1", [email])
    if (result.rows.length === 1) {
        const user = result.rows[0]
        if (cb) {
            return cb(user)
        }
        return user
    } else {
        throw new Error("User not found")
    }
}

/**
 * 
 * @param {number} id
 * @param {User} data
*/
export async function updateUser(id, data) {
    const fields = []
    const values = []
    let i = 1

    for (const key in data) {
        fields.push(`${key} = $${i}`)
        values.push(data[key])
        i++
    }

    values.push(id)
    const queryUpdate = `UPDATE users SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`
    const result = await query(queryUpdate, values)

    if (result.rows.length === 1) {
        return result.rows[0]
    } else {
        throw new Error("User not found")
    }
}

export async function deleteUser(id) {
    const result = await query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
    if (result.rows.length === 1) {
        return result.rows[0]
    } else {
        throw new Error("User not found")
    }
}
