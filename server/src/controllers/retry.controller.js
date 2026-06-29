const RetryJob = require("../models/RetryJob");
const { createRetryJob } = require("../services/retry.service");


const createRetry = async (req, res) => {
  try {
    const { paymentId, attemptNumber } = req.body;

    const retryJob = await createRetryJob(
      paymentId,
      attemptNumber || 1
    );

    res.status(201).json({
      success: true,
      message: "Retry Job Created Successfully",
      retryJob,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getRetryJobs = async (req, res) => {
  try {

    const retryJobs = await RetryJob.find()
      .populate("paymentId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: retryJobs.length,
      retryJobs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getRetryById = async (req, res) => {
  try {

    const retryJob = await RetryJob.findById(req.params.id)
      .populate("paymentId");

    if (!retryJob) {
      return res.status(404).json({
        success: false,
        message: "Retry Job not found",
      });
    }

    res.status(200).json({
      success: true,
      retryJob,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateRetry = async (req, res) => {
  try {

    const retryJob = await RetryJob.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("paymentId");

    if (!retryJob) {
      return res.status(404).json({
        success: false,
        message: "Retry Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Retry Job updated successfully",
      retryJob,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ============================
// Delete Retry Job
// ============================
const deleteRetry = async (req, res) => {
  try {

    const retryJob = await RetryJob.findByIdAndDelete(req.params.id);

    if (!retryJob) {
      return res.status(404).json({
        success: false,
        message: "Retry Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Retry Job deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  createRetry,
  getRetryJobs,
  getRetryById,
  updateRetry,
  deleteRetry,
};