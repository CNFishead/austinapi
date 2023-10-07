import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import Blog from "../../models/Blog";
import Comment from "../../models/CommentSchema";
import CommentType from "../../types/CommentType";

/**
 * @description Add a comment to a blog
 */
export default asyncHandler(async (req: any, res: any) => {
  try {
    const { id } = req.params;
    // find the blog the user wants to comment on
    const blog = await Blog.findById(id);
    // if the blog is not found, return an error
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // create the comment
    const comment = {
      content: req.body.content,
      blog: blog._id,
      name: req.body.name,
      // helps keep down spam, as every comment will need to be approved by site author
      isFlagged: true,
      flagReason: "Awaiting approval",
    } as CommentType;

    const newComment = await Comment.create(comment);
    if (!newComment) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    // return a success message
    return res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    console.log(err);
    error(err, req, res);
  }
});
