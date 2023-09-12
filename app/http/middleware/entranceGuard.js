const { RoleModel } = require("../../models/role")
const Error = require("http-errors")

function checkRole(role = []) {
    return async function (req, res, next) {
        try {
            let verify = []
            const user =  req.user
            const Role = await RoleModel.findOne({role: user.roles})
            role.forEach(rolee =>{
                if(rolee == Role.role){
                    verify.push(["confirmation"])
                }
            })
            if((verify[0])){
                next()
            }else{
                throw Error.Forbidden("you dont have permission for this part")
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = {
    checkRole
}