import * as argon2 from "argon2";
// import argon2

/**
 * 
 * @param {string} password 
 * @returns {Promise<string>}
 */

export async function GenerateHash(password) {
    const hash = await argon2.hash(password)
    return hash
}

/**
 * 
 * @param {string} hash
 * @param {string} plainText
 * @returns {Promise<boolean>}
 */
export function VerifyHash(hash, plainText) {
    const isVerified = argon2.verify(hash, plainText)
    return isVerified
}

