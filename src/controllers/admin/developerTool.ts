import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import Blog from "../../models/Blog";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";

export default asyncHandler(async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    const experiences = await Blog.find({});
    for (const e of experiences) {
      e.author = "Austin Howard";
      await e.save();
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
