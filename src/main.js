const Koa = require('koa');

const { APP_PORT } = require('./config/config.default')

const app = new Koa();

app.use((ctx,next) =>{
    ctx.body="hello koa123"
})
app.listen(APP_PORT, () => {
    console.log('server',APP_PORT)
})