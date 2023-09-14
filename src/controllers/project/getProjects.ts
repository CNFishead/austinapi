import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import error from "../../middleware/error";
import Project from "../../models/Project";
import { parse } from "dotenv";
import parseFilterOptions from "../../utils/parseFilterOptions";
import parseQueryKeywords from "../../utils/parseQueryKeywords";
import parseSortString from "../../utils/parseSortString";

/**
 * @description Get all projects, supports pagination and advanced filtering
 * @route GET /api/v1/projects
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated
 */
export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    const { pageNumber = 1, limit = 10 } = req.query as any;
    console.log(req.query);
    const projects = await Project.aggregate([
      {
        $match: {
          $and: [parseFilterOptions(req.query?.filterOptions)],
          $or: [...parseQueryKeywords(["name", "slug", "description"], req.query?.keyword)],
        },
      },
      {
        $skip: (Number(pageNumber) - 1) * Number(limit),
      },
      {
        $limit: Number(limit),
      },
      {
        $sort: {
          ...parseSortString(req.query?.sortOptions, "createdAt;-1"),
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
