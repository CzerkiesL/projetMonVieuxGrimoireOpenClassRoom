const express = require('express')
const mongoose = require('mongoose')
const app = express()

module.exports = app

mongoose.connect("mongodb+srv://czerkiesludovic:aENu3mtt7w98xscr@monvieuxgrimoire.qjopu.mongodb.net/?retryWrites=true&w=majority&appName=monVieuxGrimoire")
    .then(() => console.log('Connexion réussie !'))
    .catch(() => console.log('Connexion échouée !'))