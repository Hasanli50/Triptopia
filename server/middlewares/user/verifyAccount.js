const { body, validationResult } = require("express-validator");

const verifyAccountValidator = [
  body("verificationCode")
    .notEmpty()
    .withMessage("Verification code cannot be empty.")
    .isLength({ min: 6, max: 6 })
    .withMessage("Verification code must be exactly 6 characters long.")
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

module.exports = verifyAccountValidator;
