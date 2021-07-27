export interface Submission {
  imageFiles: [string];
}

export interface SubmissionApiData {
  submissions?: Submission[];
  error?: { message: string };
}
