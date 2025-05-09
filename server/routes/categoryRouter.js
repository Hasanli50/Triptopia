const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  getById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");
const createCategoryValidator = require("../middlewares/category/createCategory.js");
const updateCategoryValidator = require("../middlewares/category/updateCategory.js");

router.get("/", getAllCategory);
router.get("/:id", getById);
router.post("/", createCategoryValidator, createCategory);
router.patch("/:id", updateCategoryValidator, updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
