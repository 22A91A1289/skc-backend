import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import menuPackageRoutes from "./routes/menuPackageRoutes.js";
import menuCategoryRoutes from "./routes/menuCategoryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROOT TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).send("SKC Backend Running ✅");
});

/* ================= API ROUTES ================= */
app.use("/api/contact", contactRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/menu-packages", menuPackageRoutes);
app.use("/api/menu-categories", menuCategoryRoutes);
app.use("/api/reviews", reviewRoutes);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= DB + SERVER ================= */
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
    console.error("MongoDB connection error:", err);
  });
