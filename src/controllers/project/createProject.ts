import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Project from "../../models/Project";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const newProject = await Project.create(req.body);
    if (!newProject) {
      return next({
        message: "Error creating Project",
        statusCode: 400,
      });
    }

    return res.status(200).json({
      success: true,
      project: newProject,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
