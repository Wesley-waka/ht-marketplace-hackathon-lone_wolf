import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/reviews", createReview);
reviewRouter.get("/reviews/:userId", getReviews);

export default reviewRouter;