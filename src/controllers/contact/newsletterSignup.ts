import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import Newsletter from "../../models/Newsletter";

/**
 * @description adds an email to the newsletter list to receive updates about the site
 */
export default asyncHandler(async (req: any, res: any) => {
  try {
    const { email } = req.body;
    // check that the email is not empty and is a valid email
    if (!email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // attempt to create the newsletter entry
    const newsletter = await Newsletter.create({ email });
    if (!newsletter) {
      return res.status(500).json({ message: "Something went wrong, please try again later" });
    }

    // return a success message
    return res.status(200).json({ success: true, message: "Thank you for subscribing to our newsletter" });
  } catch (err: any) {
    console.log(err);
    error(err, req, res);
  }
});
