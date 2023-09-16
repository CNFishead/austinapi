import express from "express";
import { protect } from "../../middleware/auth";
import developerTool from "../../controllers/admin/developerTool";
const router = express.Router();

// Import all of our routes
router.use(protect());
router.route("/developertool").get(developerTool);

export default router;
