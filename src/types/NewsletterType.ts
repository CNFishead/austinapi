export default interface NewsletterType {
  _id: string;
  email: string;
  unsubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
