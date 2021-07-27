export interface Submission {
  active: boolean;
  imageFile: string;
  contestID: string;
  userID: string;
  title: string;
}

export interface SingleSubmissionApiData {
  submission?: Submission;
  status: string;
}

export interface ArraySubmissionApiData {
  submissions?: Submission[];
  status: string;
}
