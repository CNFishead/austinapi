import express from "express";
import { protect } from "../../middleware/auth";
import getProjects from "../../controllers/project/getProjects";
const router = express.Router();

// Import all of our routes
router.route("/").get(getProjects);
router.use(protect()); // protect all routes below this line

export default router;
