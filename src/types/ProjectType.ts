export default interface ProjectType {
  _id: string;
  name: string;
  slug: string;
  photo: string;
  isFeatured: boolean;
  githubUrl: string;
  languages: string[];
  description: string;
  liveProjectURL: string;
  createdAt: Date;
  updatedAt: Date;
}