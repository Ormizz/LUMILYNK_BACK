// routes/payment.routes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const upload = require('../middleware/payment')

// CRUD pour les paiements (payments)
router.post("/", upload.single('proof'), paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentByUser);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.put('/single/:id', paymentController.updatePaymentStatus);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;