import { db } from "../lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}

export async function getOrdersModels() {
    const queryGetOrderModels = `select orders.user_id, orders.status, orders.total, orders.image_path, orders.created_at from orders;`

    const getOrder = await query(queryGetOrderModels)

	return getOrder
}

export async function checkoutCartModels() {
};