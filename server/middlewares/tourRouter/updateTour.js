const { error } = require("console");
const { body, validationResult } = require("express-validator");
const path = require("path");

const updateTourValidation = [
  body("categoryId")
    .optional()
    .isMongoId()
    .withMessage("Category ID must be a valid MongoDB ID"),

  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long.")
    .trim(),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must be max 500 characters long.")
    .trim(),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a valid number.")
    .isFloat({ min: 0 })
    .withMessage("Price must be positive and min 0")
    .trim(),

  body("location")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Location must be max 500 characters long.")
    .trim(),

  body("duration")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Duration must be a positive integer and min 0")
    .trim(),

  body("available_dates")
    .optional()
    .isArray()
    .withMessage("Available dates must be an array.")
    .custom((value) => {
      if (
        value.length > 0 &&
        !value.every((date) => !isNaN(Date.parse(date)))
      ) {
        throw new Error("Each available date must be a valid date.");
      }
      return true;
    }),

  body("itinerary")
    .optional()
    .isArray()
    .withMessage("Itinerary must be an array.")
    .custom((value) => {
      if (
        value.length > 0 &&
        !value.every((item) => typeof item === "string")
      ) {
        throw new Error("Each item in the itinerary must be a string.");
      }
      return true;
    }),

  body("tour_guide")
    .optional()
    .custom((value) => {
      if (value) {
        if (!value.name || value.name.trim() === "") {
          throw new Error("Tour guide name is required.");
        }
        if (value.languages_spoken && !Array.isArray(value.languages_spoken)) {
          throw new Error("Languages spoken should be an array.");
        }
        if (value.rating && (value.rating < 0 || value.rating > 5)) {
          throw new Error("Tour guide rating must be between 0 and 5.");
        }
        if (!value.bio || value.bio.trim() === "") {
          throw new Error("Tour guide bio is required.");
        }
      }
      return true;
    }),

  body("max_group_size")
    .optional()
    .isInt({ min: 0, max: 40 })
    .withMessage("Group size must be between 0 and 40")
    .trim(),

  body("min_group_size")
    .optional()
    .isInt({ min: 0, max: 40 })
    .withMessage("Group size must be between 0 and 40")
    .trim(),

  body("images").custom((value, { req }) => {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (![".png", ".jpeg", ".jpg", ".gif"].includes(fileExtension)) {
          throw new Error("Each image must be a PNG, JPEG, JPG, or GIF file");
        }
      });
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

module.exports = updateTourValidation;
