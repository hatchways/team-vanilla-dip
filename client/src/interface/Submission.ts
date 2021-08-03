import { User } from './User';

export interface Submission {
  active: boolean;
  imageFiles: string[];
  contestID: string;
  userID: User;
}

export interface SingleSubmissionApiData {
  submission?: Submission;
  status: string;
}

export interface ArraySubmissionApiData {
  submissions?: Submission[];
  status: string;
}
