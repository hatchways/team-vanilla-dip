export interface User {
  email: string;
  username: string;
  _id: string;
  id: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface SearchUserApiData {
  user?: User;
  error?: { message: string };
}
