import mongoose from "mongoose";
import CertificateType from "../types/CertificateType";

const CertificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add award title"],
      trim: true,
    },
    issuingAuthority: {
      type: String,
      required: true,
      trim: true,
    },
    certificateImageUrl: {
      type: String,
      default: "/images/no-photo.jpg",
    },
    dateOfCompletion: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CertificateType>("Certificate", CertificateSchema);
