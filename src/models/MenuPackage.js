import mongoose from "mongoose";

const menuPackageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true, // standard | traditional | economic
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCategory"
      }
    ],
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("MenuPackage", menuPackageSchema);
