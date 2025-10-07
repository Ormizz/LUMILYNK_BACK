const multer = require('multer')
const path = require('path')
const db = require('../config/db')

// Helper function to get student name (promise-based)
async function getStudentName(student_id) {
    if (!student_id) {
        throw new Error("student_id manquant")
    }
    
    const sql = "SELECT full_name FROM users WHERE id = ?";
    const [results] = await db.query(sql, [student_id]);
    
    if (results.length === 0) {
        throw new Error("Étudiant introuvable")
    }
    
    return results[0].full_name;
}

// Storage for creating new documents (with student name)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/documents')
    },
    filename: (req, file, cb) => {
        const student_id = req.body.student_id
        
        getStudentName(student_id)
            .then(full_name => {
                const prenom = full_name.split(' ')[0].toLowerCase()
                const type = file.fieldname
                const ext = path.extname(file.originalname)
                const uniqueName = `${type}_${prenom}_${Date.now()}${ext}`
                cb(null, uniqueName)
            })
            .catch(err => {
                cb(err)
            })
    }
})

// Storage for replacing documents (simple naming, no DB lookup needed)
const storageReplace = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/documents')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, `replaced_${uniqueSuffix}${ext}`)
    }
})

const upload = multer({ storage })
const uploadReplace = multer({ storage: storageReplace })

module.exports = { upload, uploadReplace }