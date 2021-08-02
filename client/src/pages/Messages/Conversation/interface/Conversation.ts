import { Dispatch, SetStateAction } from 'react';
import { MessagingData } from '../../../../interface/Message';

export interface ConversationProps {
  convo: MessagingData;
  setConvo: Dispatch<SetStateAction<MessagingData | null>>;
}
