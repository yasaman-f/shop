const Error = require("http-errors")
const Controller = require("../Controller")


module.exports = new class HomeController extends Controller{
    async Controller(req, res, next){
        try {
            return res.status(200).send("Showing products to normal users")

        } catch (error) {
            next(Error.BadRequest(error.message))
        }
    }
}