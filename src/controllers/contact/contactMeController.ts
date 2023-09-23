import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import error from "../../middleware/error";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import sendEmail from "../../utils/sendEmail";

/**
 * @description Controller function for the developer portfolio contact me page, sends a message to the developer
 * @route POST /api/contact
 * @access Public
 *
 * @param {string} name - name of the person sending the message
 * @param {string} email - email of the person sending the message
 * @param {string} message - message from the person sending the message
 *
 * @returns {object} - success message
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastUpdated 2023-09-23T12:48:02.000-05:00
 */
export default asyncHandler(async (req: Request, res: Response, next: any) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, message: "Please provide a name, email, and message" });
    // check that these fields are not empty
    if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0)
      return res.status(400).json({ success: false, message: "Please provide a name, email, and message" });

    // verify that the email is valid
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "Please provide a valid email" });

    await sendEmail({
      email: process.env.CONTACT_EMAIL!,
      subject: "New Message from Portfolio",
      message: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>New Message from Portfolio</title>
        </head>
        <body>
          <h1>New Message from Portfolio</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </body>
      </html>
    `,
    });
    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (err) {
    console.log(err);
    error(err, req, res, next);
  }
});
