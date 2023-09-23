export default interface BlogType {
  _id: string;
  blogTitle: string;
  content: string;
  isFeatured: boolean;
  isPrivate: boolean;
  blogImageUrl: string;
  description: string;
  slug: string;
  tags: [string];
  createdAt: Date;
  updatedAt: Date;
}
