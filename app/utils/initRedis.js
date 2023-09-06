const redis = require ("redis").createClient()
// url: "redis://:XWf5tjP2EDE1B22o8M3BD630@billy.iran.liara.ir:30818/0",

async function redisConnect(client) {
    await client.connect();
}


redis.on("connect", () => console.log("You have connected to redis😁"))
redis.on("error", (err) => console.log("Redis Error:", err.message))
redis.on("connected", () => console.log("You are connected to redis and ready to use😉"))
redis.on("end", () => console.log("Your connection has ended🤝🏻"))
redisConnect(redis)

module.exports = redis