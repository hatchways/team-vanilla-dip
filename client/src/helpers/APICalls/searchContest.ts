import { Contest, SearchContestApiData } from '../../interface/Contest';
import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  userId: string;
}

interface ContestProps {
  contestID: string;
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

export async function fetchContestById({ contestID }: ContestProps): Promise<Contest> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/contest/${contestID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'unable to connect to server. Please try again' },
    }));
}
