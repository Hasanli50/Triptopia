const { body, validationResult } = require("express-validator");

const updateClientFeedbackValidator = [
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("review")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Review must be max 500 characters long."),

  (req, res, next) => {
    console.log("Running validator middleware");
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

module.exports = updateClientFeedbackValidator;
