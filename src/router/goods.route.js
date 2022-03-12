const Router = require("koa-router")
const { upload,create, update,remove,restore,findAll} = require("../controller/goods.controller")
const { auth,hadAdminPermission } = require("../middleware/auth.middleware")
const { validator } = require("../middleware/goods.middleware")

const router = new Router({prefix:'/goods'})
// 商品图片上传
router.post('/upload',auth,hadAdminPermission,upload)

// 商品添加
router.post('/', auth,hadAdminPermission,validator, create)
// 修改商品
router.put('/:id',auth,hadAdminPermission,validator, update)

//删除商品（数据库删除）
// router.delete('/:id',auth,hadAdminPermission,remove)

// 商品下架
router.post('/:id/off',auth,hadAdminPermission,remove)
// 商品上架
router.post('/:id/on',auth,hadAdminPermission,restore)

// 商品列表
router.get('/',findAll)

module.exports = router