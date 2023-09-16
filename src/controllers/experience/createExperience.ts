import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Experience from "../../models/Experience";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const newExperience = await Experience.create(req.body);
    if (!newExperience) {
      return next({
        message: "Error creating experience",
        statusCode: 400,
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
