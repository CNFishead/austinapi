import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Blog from "../../models/Blog";
import mongoose from "mongoose";

/**
 * @description Get a single blog by id
 * @route GET /api/v1/blog/:id
 * @access Public
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated 2023-09-23T19:30:54.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    // make sure an id was provided
    const { id } = req.params!;
    if (!id) return res.status(400).json({ success: false, message: "No id provided" });
    // look for the blog
    const blog = await Blog.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        // take the size of the views, likes and comments array and add them to the document as a number
        $addFields: {
          // the fields may not exist, so we use $ifNull to return an empty array if they don't exist
          viewsCount: { $size: { $ifNull: ["$views", []] } },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "blog",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: { $ifNull: ["$comments", []] } },
        },
      },
    ]);
    // if no blog was found
    if (!blog[0]) return res.status(404).json({ success: false, message: "No blog found" });
    // return the blog
    return res.status(200).json({ success: true, data: blog[0] });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
