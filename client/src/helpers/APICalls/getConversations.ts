import { FetchOptions } from '../../interface/FetchOptions';
import { Conversations } from '../../interface/Conversation';

export default async function getConversations(): Promise<Conversations> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/chat`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
