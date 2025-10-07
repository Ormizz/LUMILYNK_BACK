// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD pour les utilisateurs (users)
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.put("/restupdate/:id", userController.updateRest);
router.delete("/:id", userController.deleteUser);
router.put("/first-login/:id", userController.setFirstLoginFalse);

module.exports = router;
