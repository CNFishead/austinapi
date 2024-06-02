import mongoose from 'mongoose';
import slugify from 'slugify';
import BlogType from '../types/BlogType';

const BlogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, 'Please add blog title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add author name'],
      trim: true,
    },
    content: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    isVlog: {
      type: Boolean,
      default: false,
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
    views: [
      {
        ip: String,
        initialDate: {
          type: Date,
          default: Date.now,
        },
        lastViewed: Date,
        location: {
          country: {
            type: String,
          },
          state: {
            type: String,
          },
          city: {
            type: String,
          },
          latitude: {
            type: Number,
          },
          longitude: {
            type: Number,
          },
          zipcode: {
            type: String,
          },
        },
        device: {
          type: String,
          enum: ['mobile', 'desktop', 'tablet'],
        },
      },
    ],
    tags: [String],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    blogImageUrl: {
      type: String,
      default: '/images/no-photo.jpg',
    },
    description: {
      type: String,
    },
    writtenAt: {
      type: Date,
    },
    slug: String,
  },
  { timestamps: true }
) as mongoose.Schema<BlogType>;

// Create project slug from the name
BlogSchema.pre('save', function (next) {
  this.slug = slugify(this.blogTitle, { lower: true });
  next();
});

export default mongoose.model<BlogType>('Blog', BlogSchema);
