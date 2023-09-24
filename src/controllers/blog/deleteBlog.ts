import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Blog from "../../models/Blog";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { id } = req.params!;
    if (!id) return res.status(400).json({ success: false, message: "No id provided" });
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: "No blog found" });
    return res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
