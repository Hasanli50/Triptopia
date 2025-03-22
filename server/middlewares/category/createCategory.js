const { body, validationResult } = require("express-validator");

const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long.")
    .trim(),
  ,
  body("description")
    .notEmpty()
    .withMessage("Description cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Description must be max 500 characters long.")
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Validation failed",
        status: "fail",
      });
    }
    next();
  },
];

module.exports = createCategoryValidator;
