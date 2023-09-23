import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Certificate from "../../models/Certificate";

/**
 * @description Update a certificate
 * @route PUT /api/certificate/:id
 * @access Private
 * @param {string} id - certificate id
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated 2023-09-23T12:48:02.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    // find the project through projectId
    const certificate = await Certificate.findById(req.params!.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found", success: false });
    }
    // update the project
    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params!.id, { $set: req.body }, { new: true });
    // return the updated project
    return res.status(200).json({ success: true, data: updatedCertificate });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
