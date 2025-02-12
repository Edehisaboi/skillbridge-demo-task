import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router(); // Create an Express router instance

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

export default router;
