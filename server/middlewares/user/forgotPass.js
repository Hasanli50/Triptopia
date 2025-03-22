const { body, validationResult } = require("express-validator");
const { parsePhoneNumber } = require("libphonenumber-js");

const forgotPassValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),

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

module.exports = forgotPassValidator;
