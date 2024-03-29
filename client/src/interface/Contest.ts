import { User } from './User';

export interface Contest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: string;
  userID?: User;
  dateCreated: string;
  imageFiles: string[];
  _id: string;
  closed?: boolean;
}

export interface ContestApiData {
  error?: { message: string };
  success?: Contest;
}

export interface SearchContestApiData {
  contests?: Contest[];
  error?: { message: string };
}
