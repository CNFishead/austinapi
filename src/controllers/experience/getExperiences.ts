import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Experience from "../../models/Experience";
import parseFilterOptions from "../../utils/parseFilterOptions";
import parseQueryKeywords from "../../utils/parseQueryKeywords";
import parseSortString from "../../utils/parseSortString";
/**
 * @description Get all work expeiences, supports pagination and advanced filtering
 * @route GET /api/v1/expereince
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { pageNumber = 1, limit = 10 } = req.query as any;
    const data = await Experience.aggregate([
      {
        $match: {
          $and: [{ ...parseFilterOptions(req.query?.filterOptions) }],
          $or: [...parseQueryKeywords(["name", "slug", "description"], req.query?.keyword)],
        },
      },
      {
        $sort: {
          ...parseSortString(req.query?.sortOptions, "createdAt;-1"),
        },
      },
      {
        $skip: Number(limit) * (Number(pageNumber) - 1),
      },
      {
        $limit: Number(limit),
      },
    ]);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
