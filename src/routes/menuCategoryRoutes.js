import express from "express";
import upload from "../middlewares/upload.js";
import {
  createCategory,
  updateCategoryImage,
  getCategories,
} from "../controllers/menuCategoryController.js";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);
router.put("/:id/image", upload.single("image"), updateCategoryImage);
router.get("/", getCategories);

export default router;
