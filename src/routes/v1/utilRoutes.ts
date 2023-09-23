import express from "express";
import { protect } from "../../middleware/auth";
import developerTool from "../../controllers/admin/developerTool";
import contactMeController from "../../controllers/contact/contactMeController";
const router = express.Router();

// Import all of our routes
router.route("/contactme").post(contactMeController);
router.use(protect());
router.route("/developertool").get(developerTool);

export default router;
