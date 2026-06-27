const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    stripeSubscriptionId: {
      type: String,
      required: true,
      unique: true,
    },

    stripePriceId: {
      type: String,
      required: true,
    },

    stripeProductId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "PAST_DUE",
        "UNPAID",
        "CANCELLED",
        "TRIALING",
        "INCOMPLETE",
        "INCOMPLETE_EXPIRED",
        "PAUSED",
      ],
      default: "ACTIVE",
    },

    currentPeriodStart: {
      type: Date,
      required: true,
    },

    currentPeriodEnd: {
      type: Date,
      required: true,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    trialEndAt: {
      type: Date,
      default: null,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);