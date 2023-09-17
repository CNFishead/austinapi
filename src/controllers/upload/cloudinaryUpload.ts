import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import path from "path";
import fs from "fs";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { Response } from "express";

/**
 * @description: This function will upload to cloudinary a photo
 * @param       {object} req: The request object from the client
 * @param       {object} res: The response object from the server
 *
 * @access      Private
 * @route       POST /api/v1/upload/cloudinary
 * @returns     {object} photo: The photo object we need to return to the front, for saving
 *             to the database
 * @version     1.0
 * @author      Austin Howard
 * @since       1.0
 * @lastModified 2023-09-17T14:36:59.000-05:00
 *
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (!req.files) {
      return res.status(400).json({ message: `Please upload a file` });
    }

    const file = req.files.file;
    // make sure image is a photo
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({ message: `Please make sure to upload an image` });
    }
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD!) {
      return res.status(400).json({
        message: `File was too large, please upload an image less than ${process.env.MAX_FILE_UPLOAD} or 10MB in size`,
      });
    }

    // ***NOTE*** Path.parse() returns a {}, youll need to .name to access {name: String} for slugify
    const fileName = path.parse(file.name);

    // move file to the public images folder
    file.mv(`public/images/${file.name}`, async (err: any) => {
      if (err) {
        return res.status(500).json({ message: `Problem with file being moved to filesystem` });
      }
    });

    const uploadedResponse = await cloudinary.uploader.upload(`public/images/${file.name}`, {
      folder: "portfolio",
      public_id: fileName.name,
      overwrite: true,
      resource_type: "image",
      format: "webp",
      // quality, drop the quality of the image to 75%
      quality: 75,
    });

    // remove the image from the filesystem
    // await fs.unlinkSync(`public/images/${file.name}`);
    // console.log(uploadedResponse);

    return res.json({ imageUrl: uploadedResponse.secure_url, message: `Image Uploaded successfully`, filename: file.name });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
