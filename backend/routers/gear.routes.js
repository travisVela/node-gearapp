import express from "express";
import { getGear, addGear, updateGear, deleteGear } from "../controllers/gear.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-gear", protectRoute, getGear);
router.post("/add-gear", protectRoute, addGear);
router.put("/update-gear/:id", protectRoute, updateGear);
router.delete("/delete-gear/:id", protectRoute, deleteGear);

export default router;