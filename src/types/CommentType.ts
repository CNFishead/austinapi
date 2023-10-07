export default interface CommentType {
  _id: string;
  content: string;
  blog: string;
  name: string;
  isFlagged: boolean;
  isDeleted: boolean;
  flagReason: string;
  flaggedBy: string;
  deleteReason: string;
  createdAt: Date;
  updatedAt: Date;
}