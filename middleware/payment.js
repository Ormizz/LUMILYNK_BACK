const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Crée le dossier s’il n’existe pas
const uploadPath = path.join(__dirname, '../uploads/transactions')
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })
module.exports = upload
