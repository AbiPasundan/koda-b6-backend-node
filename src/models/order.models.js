import { db } from "../lib/db.js"

const query = async (text, params) => {
    const dbs = await db()
    return dbs.query(text, params)
}

export async function getOrdersModels(id) {
    const queryGetOrderModels = `select orders.user_id, orders.status, orders.total, orders.image_path, orders.created_at from orders where user_id = $1;`

    const getOrder = await query(queryGetOrderModels, [id])

    return getOrder
}

export async function checkoutCartModels(id) {
    const queryCheckoutCart = `
        BEGIN;

        WITH inserted_order AS (
            INSERT INTO orders (user_id, status, total, image_path)
            SELECT
                c.user_id,
                'pending',
                SUM(ci.base_price * ci.quantity),

            (
                SELECT pi.path
                FROM cart_items ci2
                LEFT JOIN LATERAL (
                    SELECT path
                    FROM product_images
                    WHERE product_id = ci2.product_id
                    LIMIT 1
                ) pi ON TRUE
                WHERE ci2.cart_id = c.cart_id
                LIMIT 1
            ) AS image_path

            FROM carts c
            JOIN cart_items ci ON ci.cart_id = c.cart_id
            WHERE c.user_id = $1
            GROUP BY c.user_id, c.cart_id

            RETURNING id
        )

            INSERT INTO order_items ( order_id,  product_id,  product_name,  quantity,  price,  size,  variant,  image_path )
            SELECT   io.id,  ci.product_id,  ci.product_name,  ci.quantity,  ci.base_price,  ci.size_name,  ci.variant_name,  pi.path
            FROM cart_items ci
            JOIN carts c ON ci.cart_id = c.cart_id
            JOIN inserted_order io ON TRUE

            LEFT JOIN LATERAL ( SELECT path FROM product_images WHERE product_id = ci.product_id LIMIT 1 ) pi ON TRUE

            WHERE c.user_id = $1;

            DELETE FROM cart_items
            USING carts
            WHERE cart_items.cart_id = carts.cart_id
            AND carts.user_id = $1;

            COMMIT;
    `

    try {
        await query('BEGIN')
        
        await query(queryCheckoutCart, [id])

        await query('COMMIT')
    } catch (error) {
        await query('ROLLBACK')
        throw error
    }
};