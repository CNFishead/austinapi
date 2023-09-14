import mongoose from "mongoose";
import slugify from "slugify";
import ProjectType from "../types/ProjectType";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a project title"],
      trim: true,
      maxlength: [100, "Project Name cannot exceed 100 characters"],
      unique: true,
    },
    // url friendly version of {name}
    slug: String,
    photo: {
      type: String,
      default: "/images/no-photo.jpg",
    },
    githubUrl: {
      type: String,
    },
    languages: {
      // Array of Strings
      type: [String],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters long"],
    },
    liveProjectURL: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create project slug from the name
ProjectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model<ProjectType>("Project", ProjectSchema);
