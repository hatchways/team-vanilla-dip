import { User } from './User';

export interface Contest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: string;
  userID?: User;
  dateCreated: string;
  id: string;
}

export interface ContestApiData {
  contest?: Contest;
  error?: { message: string };
}

export interface SearchContestApiData {
  contests?: Contest[];
  error?: { message: string };
}
