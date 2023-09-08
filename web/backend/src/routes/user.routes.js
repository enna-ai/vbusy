import express from "express";
import protect from "../middleware/auth.js";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

export default router;