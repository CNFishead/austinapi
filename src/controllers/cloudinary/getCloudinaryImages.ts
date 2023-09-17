import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { v2 as cloudinary } from "cloudinary";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // get all images from cloudinary
    const images = await cloudinary.api.resources({
      next_cursor: req.query?.next_cursor,
    });

    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
