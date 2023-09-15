const Router = require('express')
const commentController = require('../controllers/commentController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')


//Create post
router.post('/:id', authMiddleware, commentController.createComments)



module.exports = router