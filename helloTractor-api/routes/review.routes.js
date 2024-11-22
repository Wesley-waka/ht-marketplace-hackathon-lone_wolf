import express from "express";
import { createReview, getReviews } from "./reviewController.js";

const router = express.Router();

router.post("/reviews", createReview);
router.get("/reviews/:userId", getReviews);

export default router;