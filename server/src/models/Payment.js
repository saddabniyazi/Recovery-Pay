const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },

    stripePaymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    stripeInvoiceId: {
      type: String,
      unique: true,
      sparse: true,
    },

    amountCents: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "usd",
    },

    status: {
      type: String,
      enum: [
        "FAILED",
        "RETRYING",
        "RECOVERED",
        "LOST",
        "CANCELLED",
      ],
      default: "FAILED",
    },

    failureReason: {
      type: String,
      default: "",
    },

    failureCode: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    metadata: {
      type: Object,
      default: {},
    },

    failedAt: {
      type: Date,
      default: Date.now,
    },

    recoveredAt: {
      type: Date,
      default: null,
    },

    lostAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);