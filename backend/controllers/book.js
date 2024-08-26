const fs = require('fs')
const Book = require('../models/Book')

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json( books ))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json( book ))
        .catch(error => res.status(404).json({ error }))
}

exports.getBestBooks = (req, res, next) => {
    Book.find()
        .then(books => { 
            books.sort((a, b) => {
                return b.averageRating - a.averageRating
            })
            res.status(200).json( books.slice(0, 3) )
        })
        .catch(error => res.status(400).json({ error }))
}

exports.addBook = (req, res, next) => {
    const bookObj = JSON.parse(req.body.book)
    delete bookObj._id
    delete bookObj._userId
    const book = new Book({
        ...bookObj,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    book.save()
        .then(() => res.status(201).json({ message: 'Livre ajouté avec succès !'}))
        .catch(error => res.status(400).json({ error }))
}

exports.modifyBook = (req, res, next) => {
    const bookObj = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete bookObj._userId
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'authorisation nessecaire !'})
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObj, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifier avec succès !' }))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch(error => res.status(400).json({ error}))
}

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'authorisation nessecaire !'})
            } else {
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Livre supprimé avec succès !' }) })
                        .catch(error => res.status(401).json({ error }))
                })
            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.rateBook = (req, res, next) => {
    
}