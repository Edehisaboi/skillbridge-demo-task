import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // Create an Express router instance

// Route to fetch the authenticated user's profile
router.get("/profile", authMiddleware, getUserProfile);

// Route to update the authenticated user's profile
router.put("/profile", authMiddleware, updateUserProfile);

export default router;