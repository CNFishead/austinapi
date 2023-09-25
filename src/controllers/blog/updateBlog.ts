import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Blog from "../../models/Blog";

/**
 * @description Update a blog
 * @route PUT /api/v1/blog/:id
 * @access Private
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated 2023-09-25T14:52:50.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { id } = req.params!;
    if (!id) return res.status(400).json({ success: false, message: "No id provided" });
    // find the blog
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "No blog found" });

    // check if the blog is moving from draft to published, if so, set the published date, but only if there isnt a published date already
    // this keeps the published date from being overwritten if the blog is updated after it has been published
    // check the body for whats coming in vs, whats on the blog already
    if (req.body.isPublished && !blog.publishedAt) req.body.publishedAt = new Date();

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ success: false, message: "No blog found" });
    return res.status(200).json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
