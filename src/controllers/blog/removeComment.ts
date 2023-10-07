import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import CommentSchema from "../../models/CommentSchema";

/**
 * @description Remove a comment
 * @route DELETE /api/v1/blog/:id/comment
 * @access Private/Admin
 * @param {string} id - the id of the blog
 *
 * @returns {object} - success boolean
 *
 * @author Austin Howard
 * @version 1.0
 * @lastUpdated 2023-10-07T12:05:37.000-05:00
 */
export default asyncHandler(async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const comment = await CommentSchema.findByIdAndRemove(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    error(err, req, res);
  }
});
