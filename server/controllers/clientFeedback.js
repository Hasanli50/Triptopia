const ClientFeedback = require("../models/clientFeedback");
const formatObj = require("../utils/formatObj");

const getClientFeedback = async (req, res) => {
  try {
    const { page, size } = req.query;
    const total = await ClientFeedback.countDocuments();
    const clientFeedback = await ClientFeedback.find()
      .skip(size ? size * (page - 1) : 0)
      .limit(size)
      .sort({ createdAt: -1 })
      .populate("userId", "username profile_image");

    if (clientFeedback.length === 0) {
      return res.status(404).json({
        message: "No client feedback found",
        status: "fail",
        data: {},
      });
    } else {
      res.status(200).json({
        message: "Client feedback retrieved successfully",
        status: "success",
        data: {
          clientFeedback: clientFeedback.map(formatObj),
          total: total,
          currentPage: page,
          pageCount: size ? Math.ceil(total / size) : 1,
        },
      });
    }
  } catch (error) {
    res.tatus(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const createClientFeedback = async (req, res) => {
  try {
    const { id } = req.user;
    const { review, rating } = req.body;

    const newClientFeedback = new ClientFeedback({
      userId: id,
      review,
      rating,
    });

    await newClientFeedback.save();

    res.status(200).json({
      message: "Client feedback created successfully",
      status: "success",
      data: formatObj(newClientFeedback),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const updateClientFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating } = req.body;

    const clientFeedback = await ClientFeedback.findById(id);

    if (!clientFeedback) {
      return res.status(404).json({
        message: "Client feedback not found",
        status: "fail",
        data: {},
      });
    }

    const updateData = await ClientFeedback.findByIdAndUpdate(
      id,
      {
        review,
        rating,
      },
      { new: true, validate: true }
    );

    res.status(200).json({
      message: "Client feedback updated successfully",
      status: "success",
      data: formatObj(updateData),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const deleteClientFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const clientFeedback = await ClientFeedback.findByIdAndDelete(id);

    if (!clientFeedback) {
      return res.status(404).json({
        message: "Client feedback not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Client feedback deleted successfully",
      status: "success",
      data: {},
    });
  } catch (error) {
    res.tatus(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

module.exports = {
  getClientFeedback,
  createClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
};
