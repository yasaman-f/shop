const express = require("express")
const swaggerUi = require('swagger-ui-express')
const { default: mongoose } = require("mongoose")
const path = require("path")
const { AllRoutes } = require("./routes/routes")
const morgan = require("morgan")
const error = require("http-errors")
const swaggerJSDoc = require("swagger-jsdoc")
const cors = require("cors")
require("dotenv").config()
const cooki = require("cookie-parser")

module.exports = class Aplication{
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI){
        this.#PORT = PORT
        this.#DB_URI = DB_URI
        this.configApplication()
        this.initRedis()
        this.connectToMongoDB()
        this.createRoutes()
        this.createServer()
        this.errorHandller()
    }
    configApplication(){
        this.#app.use(cors())
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }))
        this.#app.use(cooki())
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
            swaggerDefinition: {
                openapi: "3.0.0" ,
                info: {
                    title: "Store",
                    version: "2.0.0",
                    description: "store for CV",
                    contact: {
                        name: "Yasi",
                        email: "yasi.fani.85@gmail.com",
                        url: "https://t.me/yasaman_Fn"
                    }
                },
                servers: [
                    {
                        url: "http://localhost:5000",
                        
                    },
                    {
                        url: "https://nifty-dhawan-rlx-rbjpm.iran.liara.run"
                    }
                ],
            components : {
                securitySchemes : {
                  BearerAuth : {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    
                  }
                }
              },
              security : [{BearerAuth : [] }]
            },
            apis: ["./app/routes/**/*.js"]
        }),
        { explorer: true }
        ));
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("The connection to mongoDB was successful😎");
        }).catch((err) => { console.log('connection to mongoDB failed 😓 '+ err.message);})

        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to the database ..✨");
        })
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose has been disconnected😶");
        })
        process.on("SIGINT", async() => {
            await mongoose.connection.close()
            process.exit(0)
        })
    }
    initRedis(){
        require("./utils/initRedis")
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    createServer(){
        const http = require("http")
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(" run => http://localhost:" + this.#PORT)
        })
    }
    errorHandller(){
        this.#app.use((req, res, next) => {
            next(error.NotFound("url not found"))
        })
        this.#app.use((err, req, res, next) => {
            const serverError = error.InternalServerError()
            const statusCode = err.status || serverError.status
            const message = err.message || serverError.message
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}