export default interface BlogType {
  _id: string;
  blogTitle: string;
  author: string;
  content: string;
  isFeatured: boolean;
  isPrivate: boolean;
  isPublished: boolean;
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
        enum: ["mobile", "desktop", "tablet"];
      };
    }
  ];
  comments: [
    {
      name: string;
      email: string;
      comment: string;
      date: Date;
    }
  ];
  blogImageUrl: string;
  description: string;
  slug: string;
  tags: [string];
  createdAt: Date;
  updatedAt: Date;
}
