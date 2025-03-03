const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  getById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");

router.get("/", getAllCategory);
router.get("/:id", getById);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
