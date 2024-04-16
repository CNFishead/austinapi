import { NextFunction, Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import error from '../../middleware/error';
import { v2 as cloudinary } from 'cloudinary';

/**
 * @description removes a cloudinary image, given the image id
 * @route DELETE /api/v1/cloudinary/:id
 * @access private
 * @param {string} id - the image id
 * @returns {object} - status code, message
 * @throws {Error} - throws an error if the image id is not provided
 * @throws {Error} - throws an error if the image id is not valid
 * @throws {Error} - throws an error if the image id is not found
 *
 * @author Austin Howard
 * @version 1.0
 * @last_modified 2023-09-19T19:23:32.000-05:00
 *
 */
export default asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // setup cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // if no id is provided, throw an error
      if (!req.body?.publicId) {
        return res.status(400).json({ message: 'No publicId provided' });
      }

      // ping cloudinary
      const result = await cloudinary.api.ping();

      // if the ping fails, throw an error
      if (result.status !== 'ok') {
        return res
          .status(500)
          .json({ message: 'Cloudinary is not responding' });
      }
      // remove the image
      const response = await cloudinary.uploader.destroy(req.body.publicId, {
        resource_type: req.body.resourceType || 'image',
        invalidate: true,
      });

      // if the image was not found, throw an error
      if (response.result !== 'ok') {
        return res.status(404).json({ message: 'Image not found' });
      }

      // return a success message
      res.status(200).json({ message: 'Image removed successfully' });
    } catch (err) {
      console.log(err);
      error(err, req, res, next);
    }
  }
);
