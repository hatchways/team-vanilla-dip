export interface Contest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: Date;
  userID: string;
  dateCreated: Date;
}

export interface SearchContestApiData {
  contests?: Contest[];
  error?: { message: string };
}
