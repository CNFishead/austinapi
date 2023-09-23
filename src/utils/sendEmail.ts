import nodemailer, { Transporter } from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

/**
 * @description Sends an email to the provided email address
 * @param options - email options
 * @param options.email - email to send to
 * @param options.subject - subject of the email
 * @param options.message - message of the email
 * 
 * @returns void - returns nothing
 */
const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    auth: {
      user: process.env.STMP_EMAIL!,
      pass: process.env.STMP_PASSWORD!,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;