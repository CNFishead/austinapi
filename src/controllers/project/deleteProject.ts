import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Project from "../../models/Project";

/**
 * @description Delete a project
 * @route DELETE /api/v1/project/:projectId
 * @access Private/Admin
 * @returns {object} - message
 * 
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastModified 2023-09-17T13:20:53.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    // find the project through projectId
    const project = await Project.findById(req.params!.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found", success: false });
    }
    // delete the project
    await Project.findByIdAndDelete(req.params!.projectId);
    // return the updated project
    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
