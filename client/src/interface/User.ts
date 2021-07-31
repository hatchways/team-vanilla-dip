import { Profile } from './Profile';

export interface User {
  email: string;
  username: string;
  _id: string;
  id: string;
  profile?: Profile;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface SearchUserApiData {
  user?: User;
  error?: { message: string };
}
