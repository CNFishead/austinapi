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
      date: Date;
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
