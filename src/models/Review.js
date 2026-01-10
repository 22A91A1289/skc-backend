import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      trim: true
    },

    quote: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },

    eventDate: {
      type: String // e.g. "June 2024"
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },

    approved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Indexes for better query performance
reviewSchema.index({ approved: 1, createdAt: -1 });
reviewSchema.index({ approved: 1 });

export default mongoose.model("Review", reviewSchema);
