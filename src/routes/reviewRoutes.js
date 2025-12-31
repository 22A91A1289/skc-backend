import express from "express";
import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

// User
router.post("/", createReview);

// Frontend
router.get("/", getApprovedReviews);

// Admin
router.get("/all", getAllReviews);
router.put("/:id/approve", approveReview);
router.delete("/:id", deleteReview);

export default router;
