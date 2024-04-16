import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import Blog from "../../models/Blog";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
const FB = require("fb");

export default asyncHandler(async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    // setup facebook api
    FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
    FB.options({ version: "v18.0" });

    // create a sample post
    const post = await FB.api("me/feed", "POST", {
      message: "Hello, world!",
      link: "https://www.bing.com",
      picture: "https://www.bing.com/th?id=OIP.GURnZicaENMLYBMZN9k1LwHaFS&pid=15.1",
      name: "Bing",
      caption: "This is Bing",
      description: "Bing is a web search engine",
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
