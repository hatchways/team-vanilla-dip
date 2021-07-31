import { ContestApiData } from '../../interface/Contest';
import { FetchOptions } from '../../interface/FetchOptions';

const createContest = async (
  title: string,
  description: string,
  prizeAmount: number,
  deadlineDate: Date = new Date(),
  imageFiles: string[],
): Promise<ContestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, prizeAmount, deadlineDate, imageFiles }),
  };
  return await fetch('/contest/create', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createContest;
