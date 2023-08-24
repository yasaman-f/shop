const urlRedis = require("redis-url") 
urlRedis.parse("redis://:QOwLeLuCoQJeQRIwFGEfncDV@redis:6379/0")
const redis = require ("redis").createClient()
redis.connect("redis://:4nyZrcYUtyEzaChq9MM4Fcrd@tommy.iran.liara.ir:32855/0")
redis.on("connect", () => console.log("You have connected to redis😁"))
redis.on("error", (err) => console.log("Redis Error:", err.message))
redis.on("connected", () => console.log("You are connected to redis and ready to use😉"))
redis.on("end", () => console.log("Your connection has ended🤝🏻"))

module.exports = redis