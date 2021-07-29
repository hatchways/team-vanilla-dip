import { Dispatch, SetStateAction } from 'react';

export interface ConversationProps {
  convoID: string;
  participants: string[];
  setConvo: Dispatch<SetStateAction<string | null>>;
}
