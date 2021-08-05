import { FetchOptions } from '../../interface/FetchOptions';
import { EmailApiData } from '../../interface/Email';

interface Props {
  receiverID: string;
  contestID: string;
}

export async function sendWinnerEmail({ receiverID, contestID }: Props): Promise<EmailApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiverID }),
    credentials: 'include',
  };
  return await fetch(`/contest/${contestID}/winner`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
