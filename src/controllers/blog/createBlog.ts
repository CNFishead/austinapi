import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
