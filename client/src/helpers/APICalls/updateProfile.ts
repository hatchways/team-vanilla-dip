import { FetchOptions } from '../../interface/FetchOptions';
import { ProfileApiData } from '../../interface/Profile';

interface Props {
  profileImage?: string;
  status?: string;
}

export async function updateProfile({ profileImage }: Props): Promise<ProfileApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileImage, status }),
    credentials: 'include',
  };
  console.log(`Posting ${profileImage}`);
  return await fetch(`/users/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
