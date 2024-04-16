import { Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { v2 as cloudinary } from 'cloudinary';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import error from '../../middleware/error';

export default asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: any) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      // ping
      const ping = await cloudinary.api.ping();
      if (ping.status !== 'ok')
        return res.status(500).json({
          success: false,
          message: 'Cloudinary API is not responding',
        });
      // get all images from cloudinary
      const videos = await cloudinary.api.resources({
        resource_type: 'video',
        next_cursor: req.query?.nextCursor,
        max_results: req.query?.maxResults,
      });

      return res.status(200).json({
        success: true,
        data: videos,
      });
    } catch (err) {
      console.log(err);
      error(err, req, res, next);
    }
  }
);
