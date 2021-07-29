import { FetchOptions } from '../../interface/FetchOptions';
import { Messages } from '../../interface/Message';

interface Props {
  convoID: string | undefined;
}

export default async function searchUsers({ convoID }: Props): Promise<Messages> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/chat/message/${convoID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
