const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
//register
router.post('/registration', userController.registration)
//login
router.post('/login', userController.login)
//get me
router.get('/me', authMiddleware, userController.getMe)


module.exports = router