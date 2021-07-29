import { NewMessage } from '../../interface/Message';
import { FetchOptions } from '../../interface/FetchOptions';

const postNewMessage = async (convoID: string, message: string): Promise<NewMessage> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ convoID, message }),
    credentials: 'include',
  };
  return await fetch(`/chat/message`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default postNewMessage;
