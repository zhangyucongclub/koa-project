const path = require('path')

const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const router = require('../router/index')
const errHandler = require('./errHandler')

const app = new Koa();
app.use(KoaBody({
    multipart:true,
    formidable:{
        // 在配置项option里，不推荐使用相对路径
        // 在option的配置文件，相对路径并不是相对当前文件，而是相对process.cwd()
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions:true
    }
}))
// 访问静态资源
app.use(KoaStatic(path.join(__dirname, '../upload')))
// 统一的校验
app.use(parameter(app))
app.use(router.routes())
// 统一的错误处理
app.on('error', errHandler)
module.exports = app