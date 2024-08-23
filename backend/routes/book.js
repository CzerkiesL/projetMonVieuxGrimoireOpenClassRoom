const express = require('express')
const router = express.Router()
const bookCtrl = require('../controllers/book')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/', bookCtrl.getAllBooks)
router.get('/bestrating', bookCtrl.getBestBooks)
router.get('/:id', bookCtrl.getOneBook)
router.post('/', auth, multer, bookCtrl.addBook)
router.post('/:id/rating', auth, bookCtrl.rateBook)
router.put('/:id', auth, multer, bookCtrl.modifyBook)
router.delete('/:id', auth, multer, bookCtrl.deleteBook)

module.exports = router