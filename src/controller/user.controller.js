const jwt = require('jsonwebtoken')
const { createUser,getUserInfo,updateById } = require('../service/user.service')
const { JWT_SECRET } = require("../config/config.default")
class UserController {
    async register(ctx,next){
        // 获取数据
        const { user_name,password }=ctx.request.body
        // 操作数据库
        const res = await createUser(user_name,password)
        console.log(res,111)
        // 返回结果
        ctx.body={
            code:'0',
            message:'用户注册成功',
            result:{
                id:res.id,
                user_name:res.user_name
            }
        }
    }
    async login(ctx,next){
        const { user_name } = ctx.request.body
        try {
            // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
            const { password, ...res } = await getUserInfo({ user_name })
        
            ctx.body = {
              code: 0,
              message: '用户登录成功',
              result: {
                token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
              },
            }
          } catch (err) {
            console.error('用户登录失败', err)
        }
    }
    async changePassword(ctx,next){
        const id =ctx.state.user.id
        const password = ctx.request.body.password
        if(await updateById({id,password})){
            ctx.body = {
                code:'0',
                message:'修改密码成功！',
                result:''
            }
        }else{
            ctx.body = {
                code:'10007',
                message:'修改密码失败！',
                result:''
            }    
        }
    }
}

module.exports = new UserController()