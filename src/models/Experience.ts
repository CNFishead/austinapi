import mongoose from "mongoose";
import WorkExperienceType from "../types/WorkExperienceType";

const ExperienceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a Company name"],
      trim: true,
    },
    location: { type: String, trim: true },
    jobTitle: {
      type: String,
      required: [true, "Please enter your Job title"],
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    jobDescription: {
      // Array of strings
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model<WorkExperienceType>("Experience", ExperienceSchema);
