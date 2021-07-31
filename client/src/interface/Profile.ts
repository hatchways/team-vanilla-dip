export interface Profile {
  profileImage: string;
  userID: string;
  status?: string;
}

export interface ProfileApiData {
  profile?: Profile;
  status: string;
}
