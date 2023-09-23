import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Certificate from "../../models/Certificate";

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { id } = req.params!;
    if (!id) return res.status(400).json({ success: false, message: "Please provide a certificate id" });
    const certificate = await Certificate.findById(id);
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });
    return res.status(200).json({ success: true, certificate });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
