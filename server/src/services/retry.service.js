const RetryJob = require("../models/RetryJob");
const Payment = require("../models/Payment");

const createRetryJob = async (paymentId, attemptNumber = 1) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  const scheduledAt = new Date();
  scheduledAt.setDate(scheduledAt.getDate() + 1);

  const retryJob = await RetryJob.create({
    paymentId,
    attemptNumber,
    scheduledAt,
    status: "PENDING",
  });

  return retryJob;
};

module.exports = {
  createRetryJob,
};