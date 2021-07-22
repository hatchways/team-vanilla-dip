import { SubmissionApiData } from '../../interface/Submission';
import { FetchOptions } from '../../interface/FetchOptions';

interface SubmissionProps {
  contestID: string;
}

export async function fetchAllSubmissionByContestId({ contestID }: SubmissionProps): Promise<SubmissionApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/contest/${contestID}/submission`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
