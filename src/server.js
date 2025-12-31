// import dotenv from "dotenv";
// dotenv.config(); // 👈 MUST BE FIRST

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import contactRoutes from "./routes/contactRoutes.js";
// import menuRoutes from "./routes/menuRoutes.js";
// import menuPackageRoutes from "./routes/menuPackageRoutes.js";
// import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/contact", contactRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/menu-packages", menuPackageRoutes);
// app.use("/api/menu-categories", menuCategoryRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running successfully 🚀");
// });

// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
// console.log("Mongo URI:", process.env.MONGO_URI);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected ✅");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
// import dotenv from "dotenv";
// dotenv.config(); // MUST BE FIRST

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import contactRoutes from "./routes/contactRoutes.js";
// import menuRoutes from "./routes/menuRoutes.js";
// import menuPackageRoutes from "./routes/menuPackageRoutes.js";
// import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/contact", contactRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/menu-packages", menuPackageRoutes);
// app.use("/api/menu-categories", menuCategoryRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running successfully 🚀");
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected ✅");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
// import dotenv from "dotenv";
// dotenv.config(); // MUST BE FIRST

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import contactRoutes from "./routes/contactRoutes.js";
// import menuRoutes from "./routes/menuRoutes.js";
// import menuPackageRoutes from "./routes/menuPackageRoutes.js";
// import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js"; // ✅ ADD THIS

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use("/api/contact", contactRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/menu-packages", menuPackageRoutes);
// app.use("/api/menu-categories", menuCategoryRoutes);
// app.use("/api/reviews", reviewRoutes); // ✅ ADD THIS

// app.get("/", (req, res) => {
//   res.send("Backend running successfully 🚀");
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected ✅");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
import dotenv from "dotenv";
dotenv.config(); // ✅ ONLY HERE

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import menuPackageRoutes from "./routes/menuPackageRoutes.js";
import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/menu-packages", menuPackageRoutes);
app.use("/api/menu-categories", menuCategoryRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(console.error);
