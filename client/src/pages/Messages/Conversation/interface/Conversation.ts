import { Dispatch, SetStateAction } from 'react';
import { Conversation } from '../../../../interface/Conversation';

export interface ConversationProps {
  convo: Conversation;
  setConvo: Dispatch<SetStateAction<Conversation | null>>;
}
