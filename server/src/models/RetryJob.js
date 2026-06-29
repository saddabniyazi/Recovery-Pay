const mongoose = require("mongoose");

const retryJobSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    attemptNumber: {
      type: Number,
      default: 1,
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    processedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "SUCCEEDED",
        "FAILED",
        "CANCELLED",
        "SKIPPED",
      ],
      default: "PENDING",
    },

    stripeResponse: {
      type: Object,
      default: {},
    },

    errorMessage: {
      type: String,
      default: "",
    },

    inngestEventId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RetryJob", retryJobSchema);