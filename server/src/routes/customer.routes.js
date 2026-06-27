const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

router.post("/", protect, createCustomer);
router.get("/", protect, getCustomers);
router.get("/:id", protect, getCustomerById);
router.patch("/:id", protect, updateCustomer);
router.delete("/:id", protect, deleteCustomer);

module.exports = router;