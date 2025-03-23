const { body, validationResult } = require("express-validator");

const responseToMessageValidator = [
  body("response")
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

module.exports = responseToMessageValidator;
