export default interface WorkExperienceType {
  _id: string;
  name: string;
  location: string;
  jobTitle: string;
  startDate: Date;
  isHidden: boolean;
  endDate: Date;
  jobDescription: [string];
  createdAt: Date;
  updatedAt: Date;
}
