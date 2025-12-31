// import mongoose from "mongoose";

// const menuItemSchema = new mongoose.Schema(
//   {
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "MenuCategory",
//       required: true
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     image:{
//         type:String,
//         default: true
//     },
    
//     isVeg: {
//       type: Boolean,
//       default: true
//     },
//     active: {
//       type: Boolean,
//       default: true
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("MenuItem", menuItemSchema);
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String // Cloudinary image URL
    },

    isVeg: {
      type: Boolean,
      default: true
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
