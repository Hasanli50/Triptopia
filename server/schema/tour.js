const mongoose = require("mongoose");
const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    location: { type: String, required: true },
    duration: { type: Number, min: 0 },
    available_dates: [{ type: Date }],
    itinerary: [{ type: String }],
    images: { type: [String], required: true, minItems: 0, maxItems: 10 },
    tour_guide: {
      name: { type: String },
      bio: { type: String },
      languages_spoken: { type: [String] },
      rating: { type: Number, default: 0, min: 0, max: 5 },
    },
    userIds: { type: [Schema.Types.ObjectId], ref: "User" },
    reviewIds: { type: [Schema.Types.ObjectId], ref: "Review" },
    number_of_people: { type: Number, default: 0 },
    max_group_size: { type: Number, required: true },
    min_group_size: { type: Number, min: 0, default: 1 },
  },
  { timestamps: true }
);

module.exports = tourSchema;
