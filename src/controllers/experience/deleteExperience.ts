import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Experience from "../../models/Experience";

/**
 * @descrtiption Delete an experience from the database by id
 * @route DELETE /api/v1/experience/:id
 * @access Private
 * @param {AuthenticatedRequest} req
 * @param {Response} res
 * @param {Function} next
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated TBD
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const experience = await Experience.findById(req.params!.id);
    if (!experience) {
      return next({
        message: "Experience not found",
        statusCode: 404,
      });
    }

    await Experience.findByIdAndDelete(req.params!.id);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
