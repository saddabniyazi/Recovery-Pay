const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createSubscription,
    getSubscriptions,
     getSubscriptionById,
       updateSubscription,
       deleteSubscription,

} = require("../controllers/subscription.controller");

// Create Subscription
router.post("/", protect, createSubscription);
router.get("/", protect, getSubscriptions);
router.get("/:id", protect, getSubscriptionById);
router.patch("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

module.exports = router;