import Review from "../models/Review.js";

/**
 * POST /api/reviews
 * User submits review
 */
export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      message: "Review submitted for approval",
      data: review
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};

/**
 * GET /api/reviews
 * Frontend – only approved reviews (Optimized)
 */
export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(50) // Limit to 50 reviews for better performance
      .lean(); // Use lean() for faster queries

    res.json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

/**
 * GET /api/reviews/all
 * Admin – all reviews
 */
export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
};

/**
 * PUT /api/reviews/:id/approve
 * Admin approves review
 */
export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json({
      message: "Review approved",
      data: review
    });
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/**
 * DELETE /api/reviews/:id
 * Admin deletes review
 */
export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};
