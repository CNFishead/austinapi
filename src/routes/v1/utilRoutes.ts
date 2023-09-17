import express from "express";
import { protect } from "../../middleware/auth";
import developerTool from "../../controllers/admin/developerTool";
import getCloudinaryImages from "../../controllers/cloudinary/getCloudinaryImages";
const router = express.Router();

// Import all of our routes
router.use(protect());
router.route("/developertool").get(developerTool);
router.route("/cloudinary").get(getCloudinaryImages);

export default router;
