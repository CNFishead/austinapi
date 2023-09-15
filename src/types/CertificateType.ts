export default interface CertificateType {
  _id: string;
  name: string;
  issuingAuthority: string;
  certificateImageUrl: string;
  dateOfCompletion: Date;
  createdAt: Date;
  updatedAt: Date;
}