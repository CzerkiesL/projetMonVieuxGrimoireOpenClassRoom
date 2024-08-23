const Book = require('../models/Book')

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json( books ))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json( book ))
        .catch(error => res.status(400).json({ error }))
}

exports.getBestBooks = (req, res, next) => {
    
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
        .then(() => res.status(201).json({ message: 'Livre ajouté avec succès'}))
        .catch(error => res.status(400).json({ error }))
}

exports.modifyBook = (req, res, next) => {
    
}

exports.deleteBook = (req, res, next) => {
    
}

exports.rateBook = (req, res, next) => {
    
}