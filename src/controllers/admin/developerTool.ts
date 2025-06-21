import asyncHandler from '../../middleware/asyncHandler';
import error from '../../middleware/error';
import Blog from '../../models/Blog';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
const FB = require('fb');

export default asyncHandler(
  async (req: AuthenticatedRequest, res: any, next: any) => {
    try {
      const blogs = await Blog.find({}); // find all blogs
      const user = await User.findOne({ email: 'cnfishead@gmail.com' });

      if (!blogs.length || !user) {
        return res.status(400);
      }

      // update all the blogs to have a user field for who created it
      for (const blog of blogs) {
        if (!blog.user) {
          blog.user = user._id;
        }
        if (!blog.author) {
          blog.author = user.fullName;
        }
        blog.save();
      }
      return res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      error(err, req, res, next);
    }
  }
);
