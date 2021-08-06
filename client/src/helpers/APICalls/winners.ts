import { Winners, NewWinner, Winner } from '../../interface/Winner';
import { FetchOptions } from '../../interface/FetchOptions';

export const postWinner = async (winner: Winner, contestID: string): Promise<NewWinner> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winner, contestID }),
    credentials: 'include',
  };
  return await fetch(`/winner/`, fetchOptions)
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
  return await fetch(`/winner/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
