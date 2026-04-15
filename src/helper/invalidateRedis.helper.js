import redisClient from "#/lib/redis.js";

export default async function invalidateProductCache() {
    const iterator = redisClient.scanIterator({
        MATCH: "products:*",
        COUNT: 100
    });

    for await (const key of iterator) {
        await redisClient.del(key);
    }
}