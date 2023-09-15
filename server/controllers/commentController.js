const { Post, User, Comments } = require('../models/models')


class CommentController {
    async createComments(req, res) {
        try {
            const { postId, comment, userId } = req.body
            if (!comment || comment === '') {
                res.json({ message: 'Комментарий не может быть пустым!' })
            }
            const post = await Post.findOne({ where: { id: req.params.id } })
            const incrementResult = await post.increment('message')
            const newComment = new Comments({ userId, comment, postId })
            await newComment.save()
            res.json({ newComment, incrementResult })
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async getCommentsPost(req, res) {
        try {
            const post = await Post.findOne({ where: { id: req.params.id } })
            const list = await Comments.findAll({ where: { postId: post.id } })
            res.json(list)
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
}



module.exports = new CommentController()