const { body, validationResult } = require("express-validator");
const path = require("path");

const createTourValidation = [
  body("categoryId")
    .isMongoId()
    .withMessage("Category ID must be a valid MongoDB ID"),

  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty.")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long.")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Description must be max 500 characters long.")
    .trim(),

  body("price")
    .notEmpty()
    .withMessage("Price cannot be empty.")
    .isNumeric()
    .withMessage("Price must be a valid number.")
    .isFloat({ min: 0 })
    .withMessage("Price must be positive and min 0")
    .trim(),

  body("location")
    .notEmpty()
    .withMessage("Location cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Location must be max 500 characters long.")
    .trim(),

  body("duration")
    .notEmpty()
    .withMessage("Duration cannot be empty.")
    .isInt({ min: 0 })
    .withMessage("Duration must be a positive integer and min 0")
    .trim(),

  body("available_dates")
    .notEmpty()
    .withMessage("Available dates are required.")
    .isArray()
    .withMessage("Available dates must be an array."),

  body("itinerary")
    .notEmpty()
    .withMessage("Itinerary cannot be empty.")
    .isArray()
    .withMessage("Itinerary must be an array."),

  // Tour guide validation
  body("tour_guide").custom((value) => {
    if (!value || !value.name || value.name.trim() === "") {
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
    return true;
  }),

  body("max_group_size")
    .notEmpty()
    .withMessage("Group size cannot be empty.")
    .isInt({ min: 0, max: 40 })
    .withMessage("Group size must be between 0 and 40")
    .trim(),

  body("min_group_size")
    .notEmpty()
    .withMessage("Group size cannot be empty.")
    .isInt({ min: 0, max: 40 })
    .withMessage("Group size must be between 0 and 40")
    .trim(),

  body("images").custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error("At least one image is required.");
    }

    req.files.forEach((file) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      if (![".png", ".jpeg", ".jpg", ".gif"].includes(fileExtension)) {
        throw new Error("Each image must be a PNG, JPEG, JPG, or GIF file");
      }
    });
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

module.exports = createTourValidation;
