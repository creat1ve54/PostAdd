const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, username) => {
    return jwt.sign({ id, username },
        process.env.SECRET_KEY,
        { expiresIn: '24h' },
    )
}


class UserController {
    async registration(req, res) {
        try {
            const { username, password } = req.body

            const candidate = await User.findOne({ where: { username } })
            if (candidate) {
                return res.json({
                    message: `Пользователь с таким Username: ${username} существует`,
                })
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ username, password: hashPassword })
            const token = generateJwt(user.id, user.username)
            res.json({ user, token, message: 'Регистрация прошла успешна' })
        } catch (error) {
            res.json({ message: 'Ошибка при создании пользователя!' })
        }

    }
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username } })
            if (!user) {
                return res.json({
                    message: 'Такого пользователя не существует!'
                })
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.json({
                    message: 'Неверный пароль!'
                })
            }
            const token = generateJwt(user.id, user.username)
            res.json({
                token, user, message: 'Вы вошли в систему!'
            })
        } catch (error) {
            res.json({ message: 'Ошибка при авторизации!' })
        }
    }
    async getMe(req, res) {
        try {
            const user = await User.findOne({ where: { id: req.userId } })
            if (!user) {
                return res.json({
                    message: 'Такого пользователя не существует!'
                })
            }
            const token = generateJwt(user.id, user.username)
            res.json({ token, user })
        } catch (error) {
            res.json({ message: 'Нет доступа!' })
        }
    }
}



module.exports = new UserController()