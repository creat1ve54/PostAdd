const { Post, User, Comments } = require('../models/models')
const uuid = require('uuid')
const path = require('node:path')


class PostsController {
    async createPost(req, res) {
        try {
            const { title, text } = req.body
            const user = await User.findOne({ where: { id: req.userId } })

            if (req.files) {
                let fileName = uuid.v4() + ".jpg"
                const { image } = req.files
                image.mv(path.resolve(__dirname, '..', 'static', fileName))

                const newPostWithImage = new Post({
                    username: user.username,
                    title,
                    text,
                    imgUrl: fileName,
                    userId: req.userId,
                })


                await newPostWithImage.save()
                return res.json(newPostWithImage)
            }

            const newPostWithoutImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: '',
                userId: req.userId,
            })

            await newPostWithoutImage.save()
            return res.json(newPostWithoutImage)

        } catch (error) {
            return res.json({ message: 'Что-то пошло не так' })
        }
    }
    async getAll(req, res) {
        try {
            const posts = await Post.findAll({ order: [['createdAt', 'DESC']] })
            const popularPosts = await Post.findAll({ order: [['views', 'DESC']], limit: 5 })
            if (!posts) {
                return res.json({ message: 'Постов нет!' })
            }

            res.json({ posts, popularPosts })
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async getById(req, res) {
        try {
            const post = await Post.findOne({ where: { id: req.params.id } })
            const incrementResult = await post.increment('views')
            res.json(incrementResult)
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async getMyPosts(req, res) {
        try {
            const list = await Post.findAll({ where: { userId: req.userId }, order: [['createdAt', 'DESC']] })
            res.json(list)
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async removePost(req, res) {
        try {
            const post = await Post.destroy({ where: { id: req.params.id } })
            if (!post) {
                return res.json({ message: 'Такого поста не существует!' })
            }
            res.json({ message: 'Пост был удален.' })
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
    async updatePost(req, res) {

        try {
            const { title, text, id } = req.body
            const post = await Post.findOne({ where: { id: id } })
            if (req.files) {
                let fileName = uuid.v4() + ".jpg"
                const { image } = req.files
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
                post.imgUrl = fileName || ''
            }

            post.title = title
            post.text = text

            await post.save()

            res.json(post)
        } catch (error) {
            res.json({ message: 'Что-то пошло не так' })
        }
    }
}



module.exports = new PostsController()