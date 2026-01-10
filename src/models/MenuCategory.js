// import mongoose from "mongoose";

// const menuCategorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     order: { type: Number, default: 0 },
//     image: { type: String }, // Cloudinary URL
//     active: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("MenuCategory", menuCategorySchema);
import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
    image: { type: String }, // Cloudinary image URL
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes for better query performance
menuCategorySchema.index({ active: 1, order: 1 });

export default mongoose.model("MenuCategory", menuCategorySchema);
