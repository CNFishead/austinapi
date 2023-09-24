import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import Blog from "../../models/Blog";
import Experience from "../../models/Experience";
import Project from "../../models/Project";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";

export default asyncHandler(async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    const experiences = await Blog.find({ isPublished: { $exists: false } });
    for (const e of experiences) {
      e.isPublished = true;
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
