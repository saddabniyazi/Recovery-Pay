const mongoose = require("mongoose");

const paymentFailureSchema = new mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },

    failureReason: {
      type: String,
      required: true,
      enum: [
        "insufficient_funds",
        "expired_card",
        "incorrect_cvc",
        "card_declined",
        "processing_error",
        "unknown"
      ],
    },

    attempt: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["pending", "recovered", "exhausted"],
      default: "pending",
    },

    scheduledRetryAt: {
      type: Date,
      required: true,
    },

    recoveredAt: {
      type: Date,
    },

    stripePaymentIntentId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentFailure", paymentFailureSchema);