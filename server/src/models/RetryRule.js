const mongoose = require("mongoose");

const retryRuleSchema = new mongoose.Schema(
  {
    daysOffsets: {
      type: [Number],
      default: [1, 3, 7],
    },

    maxRetries: {
      type: Number,
      default: 3,
    },

    escalationTemplateIds: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RetryRule", retryRuleSchema);