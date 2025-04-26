import mongoose, { Schema } from 'mongoose';
import BlogType from '../types/BlogType';

export interface ViewType {
  _id: mongoose.Types.ObjectId;
  blog: BlogType;
  ip: string;
  device: string;
  lastViewedAt: Date;
}

const ViewSchema = new mongoose.Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    ip: { type: String, required: true },
    device: { type: String }, // 'mobile' | 'tablet' | 'desktop'
    lastViewedAt: { type: Date, default: Date.now },
    location: {
      country: String,
      city: String,
      region: String,
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

ViewSchema.index({ blog: 1, ip: 1 }, { unique: true });

export default mongoose.model<ViewType>('View', ViewSchema);
