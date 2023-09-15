const Router = require('express')
const commentController = require('../controllers/commentController')
const router = new Router()
const postsController = require('../controllers/postsController')
const authMiddleware = require('../middleware/authMiddleware')


//Create post
router.post('/', authMiddleware, postsController.createPost)
//Get all posts
router.get('/', postsController.getAll)
//Get Post by id
router.get('/:id', postsController.getById)
//Get My Posts
router.get('/user/me', authMiddleware, postsController.getMyPosts)
//Remove My Posts
router.delete('/:id', authMiddleware, postsController.removePost)
//Update Post
router.put('/:id', authMiddleware, postsController.updatePost)
//Get comments Post
router.get('/comments/:id', commentController.getCommentsPost)


module.exports = router