import mongoose from "mongoose";
import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import Blog from "../../models/Blog";
import CommentSchema from "../../models/CommentSchema";
import parseFilterOptions from "../../utils/parseFilterOptions";
import parseQueryKeywords from "../../utils/parseQueryKeywords";
import parseSortString from "../../utils/parseSortString";

/**
 * @description fetches comments for the selected resource
 */
export default asyncHandler(async (req: any, res: any) => {
  try {
    const { pageNumber = 1, limit = 10 } = req.query as any;
    const { id } = req.params;
    // check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const comments = await CommentSchema.aggregate([
      {
        $match: {
          blog: new mongoose.Types.ObjectId(id),
          $and: [{ ...parseFilterOptions(req.query?.filterOptions) }],
          $or: [...parseQueryKeywords(["content", "name", "flagReason", "deleteReason"], req.query?.keyword)],
        },
      },
      {
        $setWindowFields: { output: { totalCount: { $count: {} } } },
      },
      {
        $sort: {
          ...parseSortString(req.query?.sortBy, "createdAt;-1"),
        },
      },
      {
        $skip: Number(limit) * (Number(pageNumber) - 1),
      },
      {
        $limit: Number(limit),
      },
    ]);
    return res.status(200).json({
      success: true,
      comments,
      pageNumber,
      // for total number of pages we have a value called totalCount in the output field of the setWindowFields stage
      // we need to target one document in the output array, so we use the 0 index, and then access the totalCount property
      // if we don't have a totalCount, we return 0
      pages: Math.ceil(comments.length > 0 ? comments[0].totalCount / limit : 0),
      totalCount: comments.length > 0 ? comments[0].totalCount : 0,
      // pages: Math.ceil(count / pageSize),
      prevPage: pageNumber - 1,
      nextPage: pageNumber + 1,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res);
  }
});
