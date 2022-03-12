const path = require('path')

const { fileUploadError,publishGoodsError, invalidPassword, invalidGoodsId} = require('../constant/err.type')
const { createGoods,updateGoods,removeGoods,restoreGoods,findAllGoods } = require('../service/goods.service')

class GoodsController {
    async upload(ctx,next){
        const { file } = ctx.request.files
        if(file) {
            ctx.body={
                code:'0',
                message:'图片上传成功',
                result: {
                    goods_img: path.basename(file.path)
                }
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }
    async create(ctx) {
        try {
            // 调用数据库
            const res = await createGoods(ctx.request.body)
            ctx.body={
                code:0,
                message:"发布商品成功",
                result:res
            }

        }catch(err) {
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }
    async update(ctx) {
        try {
            // 调用数据库
            const res = await updateGoods(ctx.params.id,ctx.request.body)
            if(res) {
                ctx.body = {
                    code: '0',
                    message: '商品修改成功',
                    result:''
                }
                
            }else {
                return ctx.app.emit('error',invalidGoodsId,ctx)
            }
        }catch(err) {
            return ctx.app.emit('error',invalidGoodsId,ctx)
        }
    }
    async remove(ctx) {
        const res = await removeGoods(ctx.params.id)
        if(res) {
            ctx.body = {
                code: '0',
                message: '商品下架成功',
                result:''
            }
        }else {
            return ctx.app.emit('error',invalidGoodsId,ctx)
        }
        
    }
    async restore(ctx) {
        const res = await restoreGoods(ctx.params.id)
        if(res) {
            ctx.body = {
                code: '0',
                message: '商品上架成功',
                result:''
            }
        }else {
            return ctx.app.emit('error',invalidGoodsId,ctx)
        }
    }
    async findAll(ctx) {
        const { pageSize=10,pageNum=1 } = ctx.request.query

        const res = await findAllGoods(pageNum,pageSize)
        ctx.body = {
            code: '0',
            message: '获取商品列表成功',
            result:res
        }

    }
}

module.exports = new GoodsController()