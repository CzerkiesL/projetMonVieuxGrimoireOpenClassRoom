const sharp = require('sharp')
const path = require('path')

module.exports = async (req, res, next) => {
    try {
        if (req.file) {
            const name = (req.file.originalname.split(' ').join('_')).split('.')[0]
            const filename = `${name}_${Date.now()}${path.extname(req.file.originalname)}`;
    
            const saveTo = path.resolve(__dirname, "../images");
            const filePath = path.join(saveTo, filename);
            
            await sharp(req.file.buffer)
                .resize({ height: 600 })
                .toFile(filePath)
            
            req.file.filename = filename
        }
        next()
    } catch (error) {
        res.status(400).json({ error })
    }
}