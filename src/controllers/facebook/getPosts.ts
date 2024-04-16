import { Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";

// tslint:disable-next-line: no-var-requires
const FB = require("fb");

export default asyncHandler(async (req: AuthenticatedRequest, res: Response, next: any) => {
  try {
    // setup facebook api
    FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
    FB.options({ version: "v18.0" });

    // get posts
    const posts = await FB.api("me/posts", {
      fields: [
        "message",
        "created_time",
        "full_picture",
        "permalink_url",
        "actions",
        "description",
        "full_picture",
        "target",
        "comments{likes}",
        "targeting",
        "reactions",
        "caption",
        "message",
      ],
    });
    // return posts
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
