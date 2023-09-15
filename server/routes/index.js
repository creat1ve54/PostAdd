const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const postsRouter = require('./postsRouter')
const commentRouter = require('./commentRouter')


router.use('/auth', userRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentRouter)


module.exports = router