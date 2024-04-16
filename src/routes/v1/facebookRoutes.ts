import express from "express";
import { protect } from "../../middleware/auth";
const router = express.Router();

// Import all of our routes

router.use(protect()); 

export default router;
