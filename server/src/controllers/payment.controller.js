const Payment = require("../models/Payment");
const Customer = require("../models/Customer");
const Subscription = require("../models/Subscription");


const createPayment = async (req, res) => {
  try {
    const {
      customerId,
      subscriptionId,
      stripePaymentIntentId,
      stripeInvoiceId,
      amountCents,
      currency,
      status,
      failureReason,
      failureCode,
      description,
      metadata,
    } = req.body;

    // Check Customer
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check Subscription (Optional)
    if (subscriptionId) {
      const subscription = await Subscription.findById(subscriptionId);

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found",
        });
      }
    }

    const payment = await Payment.create({
      customerId,
      subscriptionId,
      stripePaymentIntentId,
      stripeInvoiceId,
      amountCents,
      currency,
      status,
      failureReason,
      failureCode,
      description,
      metadata,
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("customerId")
      .populate("subscriptionId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("customerId")
      .populate("subscriptionId");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customerId")
      .populate("subscriptionId");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// =========================
// Delete Payment
// =========================
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createPayment,
  getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};