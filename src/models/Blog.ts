import mongoose from "mongoose";
import slugify from "slugify";
import BlogType from "../types/BlogType";

const BlogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, "Please add blog title"],
      trim: true,
    },
    content: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    comments: [
      {
        name: String,
        email: String,
        comment: String,
        date: Date,
      },
    ],
    views: [
      {
        ip: String,
        date: Date,
      },
    ],
    tags: [String],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    blogImageUrl: {
      type: String,
      default: "/images/no-photo.jpg",
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters long"],
      required: true,
    },
    slug: String,
  },
  { timestamps: true }
);

// Create project slug from the name
BlogSchema.pre("save", function (next) {
  this.slug = slugify(this.blogTitle, { lower: true });
  next();
});

export default mongoose.model<BlogType>("Blog", BlogSchema);
