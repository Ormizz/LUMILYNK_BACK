// routes/field.routes.js
const express = require("express");
const router = express.Router();
const levelController = require("../controllers/levelController");

// CRUD pour les filières (fields)
router.get("/", levelController.getAllLevels);

module.exports = router;