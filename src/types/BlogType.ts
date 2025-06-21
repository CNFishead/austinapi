import { ObjectId } from 'mongoose';

export default interface BlogType {
  _id: string;
  blogTitle: string;
  user: ObjectId;
  author: string;
  content: string;
  isFeatured: boolean;
  isPrivate: boolean;
  isPublished: boolean;
  isVlog: boolean;
  videoUrl: string;
  publishedAt: Date;
  views: [
    {
      ip: string;
      initialDate: Date;
      lastViewed: Date;
      location: {
        country: string;
        state: string;
        city: string;
        latitude: number;
        longitude: number;
        zipcode: string;
      };
      device: {
        type: string;
        enum: ['mobile', 'desktop', 'tablet'];
      };
    }
  ];
  comments: [
    {
      name: string;
      comment: string;
      date: Date;
    }
  ];
  blogImageUrl: string;
  description: string;
  writtenAt: Date;
  slug: string;
  tags: [string];
  createdAt: Date;
  updatedAt: Date;
}
