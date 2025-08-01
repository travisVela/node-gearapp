import express from "express";
import { login, logout, signup, refreshToken, getProfile, updateProfile, findUsername, findEmail } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);
router.put('/update-profile', protectRoute, updateProfile)
router.get('/check-username/:username', findUsername)
router.get('/check-email/:email', findEmail)

export default router;
