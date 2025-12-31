// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     email: {
//       type: String,
//       required: true,
//       lowercase: true
//     },

//     phone: {
//       type: String,
//       required: true
//     },

//     subject: {
//       type: String,
//       required: true
//     },

//     message: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     timestamps: true // createdAt & updatedAt auto
//   }
// );

// const Contact = mongoose.model("Contact", contactSchema);

// export default Contact;
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
