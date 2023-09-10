import express from "express";
import protect from "../middleware/auth.js";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/settings").get(protect, updateUserProfile);

export default router;