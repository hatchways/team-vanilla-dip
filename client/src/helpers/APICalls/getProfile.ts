import { FetchOptions } from '../../interface/FetchOptions';
import { NewProfile } from '../../interface/Profile';

interface Props {
  userID: string;
}

export async function getProfile({ userID }: Props): Promise<NewProfile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/profile/${userID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
