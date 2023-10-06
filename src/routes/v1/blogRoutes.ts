import express from "express";
import { protect } from "../../middleware/auth";
import getBlogs from "../../controllers/blog/getBlogs";
import createBlog from "../../controllers/blog/createBlog";
import getBlog from "../../controllers/blog/getBlog";
import updateBlog from "../../controllers/blog/updateBlog";
import deleteBlog from "../../controllers/blog/deleteBlog";
import getBlogPublic from "../../controllers/blog/getBlogPublic";
import { viewIncrease } from "../../controllers/blog/viewIncrease";
const router = express.Router();

// Import all of our routes
router.route("/").get(getBlogs);
router.route("/:slug/public").get(getBlogPublic);
router.route("/:id/view").put(viewIncrease);

router.use(protect()); // protect all routes below this line
router.route("/").post(createBlog);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

export default router;
