import { FetchOptions } from '../../interface/FetchOptions';
import { SearchUserApiData } from '../../interface/User';

interface Props {
  id: string | undefined;
}

export default async function searchUsers({ id }: Props): Promise<SearchUserApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
