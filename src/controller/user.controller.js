const { createUser } = require('../service/user.service')
class UserController {
    async register(ctx,next){
        const { user_name,password }=ctx.request.body
        await createUser(user_name,password)
        ctx.body=ctx.request.body
    }
    async login(ctx,next){
        ctx.body="登录成功"
    }
}

module.exports = new UserController()