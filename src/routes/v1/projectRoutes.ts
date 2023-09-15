import express from "express";
import { protect } from "../../middleware/auth";
import getProjects from "../../controllers/project/getProjects";
import createProject from "../../controllers/project/createProject";
import getProject from "../../controllers/project/getProject";
import deleteProject from "../../controllers/project/deleteProject";
import updateProject from "../../controllers/project/updateProject";
const router = express.Router();

// Import all of our routes
router.route("/").get(getProjects);

router.use(protect()); // protect all routes below this line
router.route("/").post(createProject);
router.route("/:projectId").get(getProject).put(updateProject).delete(deleteProject);

export default router;
