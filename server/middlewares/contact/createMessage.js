const { body, validationResult } = require("express-validator");

const createMessageValidator = [
  body("name")
    .notEmpty()
    .withMessage("Username cannot be empty.")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),
  body("message")
    .notEmpty()
    .withMessage("Message cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Message must be max 500 characters long.")
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

module.exports = createMessageValidator;
