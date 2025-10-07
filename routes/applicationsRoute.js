// routes/application.routes.js
const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { verifyToken } = require('../middleware/authMiddleware');

// CRUD pour les applications
router.post("/", applicationController.createApplication);
router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

// Nouvelle route pour mettre à jour uniquement le statut
router.patch("/:id/status", applicationController.updateApplicationStatus);

module.exports = router;
