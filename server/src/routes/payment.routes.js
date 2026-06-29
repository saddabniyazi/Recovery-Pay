const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
} = require("../controllers/payment.controller");

// Create Payment
router.post("/", protect, createPayment);
router.get("/", protect, getPayments);
router.get("/:id", protect, getPaymentById);
router.patch("/:id", protect, updatePayment);
router.delete("/:id", protect, deletePayment);
module.exports = router;