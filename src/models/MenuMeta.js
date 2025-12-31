// import mongoose from "mongoose";

// const menuMetaSchema = new mongoose.Schema(
//   {
//     pdfUrl: {
//       type: String,
//       required: true
//     },
//     lastUpdated: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("MenuMeta", menuMetaSchema);
import mongoose from "mongoose";

const menuMetaSchema = new mongoose.Schema(
  {
    menuType: {
      type: String,
      enum: ["standard", "traditional", "economic"],
      required: true,
      unique: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MenuMeta", menuMetaSchema);

