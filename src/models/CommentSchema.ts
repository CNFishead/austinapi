import mongoose, { Schema, Document } from "mongoose";
import CommentType from "../types/CommentType";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // comment security flags
    isFlagged: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // reason for flagging the comment
    flagReason: {
      type: String,
      maxlength: 280,
    },
    // the user who flagged the comment
    flaggedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // deletion reason
    deleteReason: {
      type: String,
      maxlength: 280,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CommentType>("Comment", CommentSchema);
