const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createRetry,
  getRetryJobs,
  getRetryById,
    updateRetry,
    deleteRetry,
} = require("../controllers/retry.controller");

router.post("/", protect, createRetry);

router.get("/", protect, getRetryJobs);
router.get("/:id", protect, getRetryById);
router.patch("/:id", protect, updateRetry);
router.delete("/:id", protect, deleteRetry);

module.exports = router;