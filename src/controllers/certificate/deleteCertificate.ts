import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Certificate from "../../models/Certificate";

/**
 * @description Delete a certificate by id from the database
 * @route DELETE /api/certificate/:id
 * @access Private
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated 2023-09-23T12:48:02.000-05:00
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    // check for certificate id
    const { id } = req.params!;
    if (!id) return res.status(400).json({ success: false, message: "Please provide a certificate id" });
    // find the certificate and delete it
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });
    // return success
    return res.status(200).json({ success: true, message: "Certificate deleted" });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
