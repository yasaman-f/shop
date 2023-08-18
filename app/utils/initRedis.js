const redis = require ("redis").createClient()
redis.connect()
redis.on("connect", () => console.log("You have connected to redis😁"))
redis.on("error", (err) => console.log("Redis Error:", err.message))
redis.on("connected", () => console.log("You are connected to redis and ready to use😉"))
redis.on("end", () => console.log("Your connection has ended🤝🏻"))

module.exports = redis