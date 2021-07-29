export interface Contest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: string;
  userID: string;
  dateCreated: string;
  id: string;
}

export interface ContestApiData {
  error?: { message: string };
  success?: Contest;
}

export interface SearchContestApiData {
  contests?: Contest[];
  error?: { message: string };
}
