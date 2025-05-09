const { body, validationResult } = require("express-validator");

const createReviewValidator = [
  body("rating")
    .notEmpty()
    .withMessage("Rating cannot be empty.")
    .isLength({min: 1})
    .withMessage("Rating must be min 5 rating")
    .isLength({max: 5})
    .withMessage("Rating must be max 5 rating"),

  body("review")
    .notEmpty()
    .withMessage("Review cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Review must be max 500 characters long."),

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

module.exports = createReviewValidator;
