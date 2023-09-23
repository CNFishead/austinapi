import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Certificate from "../../models/Certificate";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const newCertificate = await Certificate.create(req.body);
    if (!newCertificate) {
      return res.status(400).json({
        success: false,
        message: "Error creating Certificate",
      });
    }

    return res.status(200).json({
      success: true,
      certificate: newCertificate,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
