import { Response } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import error from '../../middleware/error';
import Blog from '../../models/Blog';
import parseFilterOptions from '../../utils/parseFilterOptions';
import parseQueryKeywords from '../../utils/parseQueryKeywords';
import parseSortString from '../../utils/parseSortString';

/**
 * @description Get all projects, supports pagination and advanced filtering
 * @route GET /api/v1/projects
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0.2
 * @lastUpdated
 */
export default asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: any) => {
    try {
      const { pageNumber = 1, limit = 10 } = req.query as any;
      const blogs = await Blog.aggregate([
        {
          $match: {
            $and: [{ ...parseFilterOptions(req.query?.filterOptions) }],
            $or: [
              ...parseQueryKeywords(
                ['blogTitle', 'slug', 'description', 'tags', 'content'],
                req.query?.keyword
              ),
            ],
          },
        },
        {
          $lookup: {
            from: 'views',
            localField: '_id',
            foreignField: 'blog',
            as: 'views',
          },
        },
        {
          $addFields: {
            viewsCount: { $size: '$views' },
          },
        },
        {
          $setWindowFields: { output: { totalCount: { $count: {} } } },
        },
        {
          // take the size of the views, likes and comments array and add them to the document as a number
          $addFields: { 
            commentsCount: { $size: { $ifNull: ['$comments', []] } },
          },
        },
        {
          $sort: {
            ...parseSortString(req.query?.sortBy, 'createdAt;-1'),
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
        blogs,
        pageNumber,
        // for total number of pages we have a value called totalCount in the output field of the setWindowFields stage
        // we need to target one document in the output array, so we use the 0 index, and then access the totalCount property
        // if we don't have a totalCount, we return 0
        pages: Math.ceil(blogs.length > 0 ? blogs[0].totalCount / limit : 0),
        totalCount: blogs.length > 0 ? blogs[0].totalCount : 0,
        // pages: Math.ceil(count / pageSize),
        prevPage: pageNumber - 1,
        nextPage: pageNumber + 1,
      });
    } catch (err) {
      console.log(err);
      error(err, req, res, next);
    }
  }
);
