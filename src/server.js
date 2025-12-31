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
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import contactRoutes from "./routes/contactRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";
import menuPackageRoutes from "./routes/menuPackageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

/* ===============================
   Middlewares
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   Root Health Check (IMPORTANT)
================================ */
app.get("/", (req, res) => {
  res.status(200).send("✅ SKC Backend is running on Render 🚀");
});

/* ===============================
   API Routes
================================ */
app.use("/api/contact", contactRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/menu-categories", menuCategoryRoutes);
app.use("/api/menu-packages", menuPackageRoutes);
app.use("/api/reviews", reviewRoutes);

/* ===============================
   404 Handler
================================ */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

/* ===============================
   MongoDB Connection + Server
================================ */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌", err);
  });
