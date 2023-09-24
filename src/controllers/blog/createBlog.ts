import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Blog from "../../models/Blog";

/**
 * @description Create a new blog
 * @route POST /api/v1/blog
 * @access Private
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated 2023-09-23T19:30:54.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const newBlog = await Blog.create(req.body);
    if (!newBlog) return res.status(400).json({ success: false, message: "Blog was not created" });
    return res.status(200).json({ success: true, blog: newBlog });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
