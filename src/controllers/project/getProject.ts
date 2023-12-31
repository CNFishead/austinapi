import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Project from "../../models/Project";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { projectId } = req.params as any;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    return res.status(200).json({
      success: true,
      project,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
