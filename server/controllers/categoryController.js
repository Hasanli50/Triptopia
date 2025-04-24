const Category = require("../models/category");
const formatObj = require("../utils/formatObj");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res.status(404).json({
        message: "Categories not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Categories successfully found",
      status: "success",
      data: categories.map(formatObj),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Ctaegory not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Category successfully found",
      status: "success",
      data: formatObj(category),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const duplicate = await Category.findOne({
      $or: [{ name }],
    });

    if (duplicate) {
      return res.status(404).json({
        message: "This category already exists",
      });
    }

    const newCategory = new Category({
      name,
      description,
    });

    newCategory.save();

    res.status(200).json({
      message: "Category successfully created",
      status: "success",
      data: formatObj(newCategory),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        status: "fail",
        data: {},
      });
    }

    const sentCategory = {
      name,
      description,
    };

    const updateCategory = await Category.findByIdAndUpdate(id, sentCategory, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Category successfully uptated",
      status: "success",
      data: formatObj(updateCategory),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Category successfully deleted",
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

module.exports = {
  getAllCategory,
  getById,
  createCategory,
  updateCategory,
  deleteCategory,
};
