const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// Таблицы

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
},
    { timestamps: true }
)


const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING(1000), allowNull: false },
    imgUrl: { type: DataTypes.STRING, defaultValue: '' },
    views: { type: DataTypes.DOUBLE, defaultValue: 0 },
    message: { type: DataTypes.DOUBLE, defaultValue: 0 },
},
    { timestamps: true }
)

const Comments = sequelize.define('comments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.STRING, allowNull: false }
})




//Связи

User.hasOne(Post)
Post.belongsTo(User)

Post.hasOne(Comments)
Comments.belongsTo(Post)

User.hasOne(Comments)
Comments.belongsTo(User)

//Export 
module.exports = {
    User,
    Post,
    Comments,
}