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
 * @lastUpdated 2023-09-23T21:02:58.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { id } = req.params!;
    if (!id) return res.status(400).json({ success: false, message: "No id provided" });
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ success: false, message: "No blog found" });
    return res.status(200).json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
