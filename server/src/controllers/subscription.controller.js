const Subscription = require("../models/Subscription");
const Customer = require("../models/Customer");

const createSubscription = async (req, res) => {
  try {
    const {
      customerId,
      stripeSubscriptionId,
      stripePriceId,
      stripeProductId,
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelledAt,
      trialEndAt,
      metadata,
    } = req.body;

    // Check customer exists
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
      const existingSubscription = await Subscription.findOne({
  stripeSubscriptionId,
});

if (existingSubscription) {
  return res.status(400).json({
    success: false,
    message: "Subscription already exists",
  });
}
    const subscription = await Subscription.create({
      customerId,
      stripeSubscriptionId,
      stripePriceId,
      stripeProductId,
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelledAt,
      trialEndAt,
      metadata,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Subscriptions
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("customerId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Subscription By ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("customerId");

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      subscription,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Subscription
const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      subscription,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Subscription
const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
                
module.exports = {
      getSubscriptionById,
  createSubscription,
    getSubscriptions,
     updateSubscription,
     deleteSubscription,
};