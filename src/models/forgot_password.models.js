import { db } from "#/lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}

export async function requestForgotPasswordModels(userId, token) {
    const queryRequestForgotPassword = `INSERT INTO forgot_password (user_id, token, created_at, expires_at) VALUES ($1, $2, NOW(), NOW() + INTERVAL '5 minutes')`
    const requestForgotPassword = await query(queryRequestForgotPassword, [userId, token])

    return requestForgotPassword
}

export async function resetPasswordByTokenModels(token, newHashedPassword) {
    try {
        await query('BEGIN')

        const { rows } = await query(
            `SELECT user_id 
             FROM forgot_password 
             WHERE token = $1 AND expires_at > NOW()
             FOR UPDATE`,
            [token]
        )

        if (rows.length === 0) {
            throw new Error('Token invalid or expired')
        }

        const userId = rows[0].user_id

        await query(
            `UPDATE users SET password = $1 WHERE id = $2`,
            [newHashedPassword, userId]
        )

        await query(
            `DELETE FROM forgot_password WHERE token = $1`,
            [token]
        )

        await query('COMMIT')

        return true
    } catch (error) {
        await query('ROLLBACK')
        throw error
    }
}