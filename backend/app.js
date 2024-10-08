const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')

const app = express()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@monvieuxgrimoire.qjopu.mongodb.net/?retryWrites=true&w=majority&appName=monVieuxGrimoire`)
.then(() => console.log('Connexion réussie !'))
.catch(() => console.log('Connexion échouée !'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/books', bookRoutes)

module.exports = app