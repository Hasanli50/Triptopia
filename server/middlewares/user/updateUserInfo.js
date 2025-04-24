const { body, validationResult } = require("express-validator");
const { parsePhoneNumber } = require("libphonenumber-js");

const updateUserInfoValidator = [
  body("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),

  body("phone_number")
    .optional()
    .custom((value) => {
      if (value) {
        const phoneNumber = parsePhoneNumber(value, "AZ");
        if (!phoneNumber.isValid()) {
          throw new Error("Invalid phone number");
        }
      }

      return true;
    }),

  body("profile_image").custom((value, { req }) => {
    if (req.file && !req.file.mimetype.match(/^image\//)) {
      throw new Error("Uploaded file is not an image");
    }
    return true;
  }),

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

module.exports = updateUserInfoValidator;
