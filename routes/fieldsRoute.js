// routes/field.routes.js
const express = require("express");
const router = express.Router();
const fieldController = require("../controllers/fieldController");

// CRUD pour les filières (fields)
router.post("/", fieldController.createField);
router.get("/", fieldController.getAllFields);
router.get("/:id", fieldController.getFieldById);
router.put("/:id", fieldController.updateField);
router.delete("/:id", fieldController.deleteField);

module.exports = router;