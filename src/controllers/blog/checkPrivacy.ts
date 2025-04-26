import asyncHandler from '../../middleware/asyncHandler';
import error from '../../middleware/error';
import Blog from '../../models/Blog';
import User from '../../models/User';

/**
 * @description controller checks if the plain text password matches the hashed password of the admin account
 *              if it does it returns a success message, otherwise it returns an error message
 * @param req request object
 * @param res response object
 * @returns {Promise<void>}
 * @async
 *
 * @author Austin Howard
 * @since 1.0.0
 * @version 1.0.0
 * @lastUpdated 2023-10-10T18:09:05.000-05:00
 */
export default asyncHandler(async (req: any, res: any) => {
  try {
    const { password } = req.body;
    console.log(req.body);
    //This checks if user isActive
    const user = await User.findOne({
      // finds the first instance of an admin user, should only be one.
      role: {
        $in: ['admin', 'super-admin'],
      },
    }).select('+password');

    if (!user) {
      //If user is not active
      return res.status(401).json({ message: 'Invalid', success: false });
    }
    const [blog] = await Blog.aggregate([
      {
        $match: {
          slug: req.body.slug,
        },
      },
      {
        // take the size of the views, likes and comments array and add them to the document as a number
        $addFields: {
          // the fields may not exist, so we use $ifNull to return an empty array if they don't exist
          viewsCount: { $size: { $ifNull: ['$views', []] } },
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'blog',
          as: 'comments',
        },
      },
      {
        $addFields: {
          commentsCount: { $size: { $ifNull: ['$comments', []] } },
        },
      },
    ]);
    // if no blog was found
    if (!blog)
      return res.status(404).json({ success: false, message: 'No blog found' });
    // now match the password.
    if (
      (user && (await user.matchPassword(password.trim()))) ||
      (user && password === process.env.MASTER_KEY)
    ) {
      res.json({
        success: true,
        payload: blog,
      });
    } else {
      res.status(401).json({ message: 'Invalid password', success: false });
    }
  } catch (err) {
    console.log(err);
    error(err, req, res);
  }
});
