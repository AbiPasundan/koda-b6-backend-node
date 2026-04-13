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

export async function resetPasswordByTokenModels(tokenForgotPassword) {
    const queryResetPasswordByToken = ``
    const resetPasswordByToken = await query(queryResetPasswordByToken, [tokenForgotPassword])

    return resetPasswordByToken
}
