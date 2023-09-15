require('dotenv').config()

const express = require('express')
const sequelize = require('./db')


const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileUpload = require("express-fileupload")
const path = require('path')
const router = require('./routes/index')
const models = require('./models/models')

const app = express()
// Middleware 
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('static'))



//Routes

app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () =>
            console.log(`Server started on port ${PORT}...`
            ))
    } catch (error) {
        console.log(error)
    }
}


start()