import express from "express";
import { protect } from "../../middleware/auth";
import getCloudinaryImages from "../../controllers/cloudinary/getCloudinaryImages";
import removeCloudinaryImage from "../../controllers/cloudinary/removeCloudinaryImage";
import getCloudinaryVideos from "../../controllers/cloudinary/getCloudinaryVideos";
const router = express.Router();

// Import all of our routes
router.use(protect());
router.route("/").get(getCloudinaryImages);
router.route("/videos").get(getCloudinaryVideos);
router.route("/delete").post(removeCloudinaryImage);

export default router;
