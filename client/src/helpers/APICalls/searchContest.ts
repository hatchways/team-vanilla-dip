import { SearchContestApiData } from '../../interface/Contest';
import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  userId: string;
}

export async function fetchAllContestByUserId({ userId }: Props): Promise<SearchContestApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/contest/user/${userId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
