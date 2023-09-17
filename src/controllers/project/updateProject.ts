import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Project from "../../models/Project";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    // find the project through projectId
    const project = await Project.findById(req.params!.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found", success: false });
    }
    // update the project
    const updatedProject = await Project.findByIdAndUpdate(
      req.params!.projectId,
      { $set: req.body },
    );
    // return the updated project
    return res.status(200).json({ success: true, data: updatedProject });
    
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
