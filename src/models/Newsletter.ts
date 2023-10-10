import mongoose from "mongoose";
import NewsletterType from "../types/NewsletterType";

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    unsubscribed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<NewsletterType>("Newsletter", NewsletterSchema);
