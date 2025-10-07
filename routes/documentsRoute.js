// routes/document.routes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const { upload, uploadReplace } = require('../middleware/upload')

router.post(
    '/upload',
    upload.fields([
        { name: 'identity', maxCount: 1 },
        { name: 'diploma', maxCount: 1 },
        { name: 'transcripts', maxCount: 1 },
        { name: 'photo', maxCount: 1 }
    ]),
    documentController.uploadDocuments
    );

// CRUD pour les documents
router.post("/", upload.single("file"), documentController.createDocument);
router.get("/", documentController.getAllDocuments);
router.get("/letters", documentController.getAllLetters);
router.get("/:id", documentController.getDocumentByUserId);
router.get("/letters/:id", documentController.getLettersByUserId)
router.put("/:id", documentController.updateDocument);
router.put("/status/:id", documentController.updateStatus);
router.delete("/:id", documentController.deleteDocument);
router.put('/replace/:id', uploadReplace.single('file'), documentController.replaceDocument);
module.exports = router;
