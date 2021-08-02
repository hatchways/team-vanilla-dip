import { NewConversation } from '../../interface/Conversation';
import { FetchOptions } from '../../interface/FetchOptions';

const postNewConvo = async (receiverID: string): Promise<NewConversation> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receiverID }),
    credentials: 'include',
  };
  return await fetch(`/chat`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default postNewConvo;
