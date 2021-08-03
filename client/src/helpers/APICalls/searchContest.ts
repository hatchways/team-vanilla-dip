import { SearchContestApiData, ContestApiData } from '../../interface/Contest';
import { FetchOptions } from '../../interface/FetchOptions';
import { ArraySubmissionApiData, SingleSubmissionApiData } from '../../interface/Submission';

interface Props {
  id: string;
}

export async function fetchContestById({ id }: Props): Promise<ContestApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/contest/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function fetchAllContestByUserId({ id }: Props): Promise<SearchContestApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/contest/user/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function fetchSubmissionByContestId({ id }: Props): Promise<ArraySubmissionApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/contest/submission/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
interface CreateSubmission {
  contestID: string;
  imageFile: string;
}
export async function addSubmissionToContest({
  contestID,
  imageFile,
}: CreateSubmission): Promise<SingleSubmissionApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageFile }),
  };
  console.log(JSON.stringify({ imageFile }));
  return await fetch(`/contest/${contestID}/submission`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
