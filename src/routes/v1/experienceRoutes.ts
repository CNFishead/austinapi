import express from "express";
import { protect } from "../../middleware/auth";
import getExperiences from "../../controllers/experience/getExperiences";
import createExperience from "../../controllers/experience/createExperience";
import getExperience from "../../controllers/experience/getExperience";
import updateExperience from "../../controllers/experience/updateExperience";
import deleteExperience from "../../controllers/experience/deleteExperience";
const router = express.Router();

// Import all of our routes
router.route("/").get(getExperiences);

router.use(protect()); // protect all routes below this line
router.route("/").post(createExperience);
router.route("/:id").get(getExperience).put(updateExperience).delete(deleteExperience);

export default router;
