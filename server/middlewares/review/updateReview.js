const { body, validationResult } = require("express-validator");

const updateReviewValidator = [
  body("rating")
    .optional()
    .min(1, "Rating must be least 1 rating")
    .max(1, "Rating must be max 5 rating"),
  body("review")
    .optional()
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

module.exports = updateReviewValidator;
