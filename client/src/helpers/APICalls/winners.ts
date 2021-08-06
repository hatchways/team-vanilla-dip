import { Winners, NewWinner } from '../../interface/Winner';
import { FetchOptions } from '../../interface/FetchOptions';

export const postWinner = async (winnerID: string, contestID: string): Promise<NewWinner> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winnerID, contestID }),
    credentials: 'include',
  };
  return await fetch(`/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getWinners = async (): Promise<Winners> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
