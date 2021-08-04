import { User } from './User';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface Profile {
  profileImage: string;
  userID: string;
  status?: string;
}

export interface ProfileApiData {
  success?: AuthApiDataSuccess;
  error?: { message: string };
  status: string;
}
