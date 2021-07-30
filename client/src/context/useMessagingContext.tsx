import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { User } from '../interface/User';
import { Message } from '../interface/Message';
import { Conversation } from '../interface/Conversation';

interface IMessagingData {
  conversation: Conversation;
  participant?: User;
  messages?: Message[];
  lastMessage?: Message;
}

interface IMessagingContext {
  conversations: IMessagingData[] | [];
  updateConversations: (convo: IMessagingData) => void;
}

export const MessagingContext = createContext<IMessagingContext>({
  conversations: [],
  updateConversations: () => null,
});

export const MessagesProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<IMessagingData[] | []>([]);

  const updateConversations = (convo: IMessagingData) => {
    setConversations((prev) => [...prev, convo]);
  };

  useEffect(() => {
    console.log('Context use Effect');
  }, []);

  return (
    <MessagingContext.Provider value={{ conversations, updateConversations }}>{children}</MessagingContext.Provider>
  );
};

export function useMessages(): IMessagingContext {
  return useContext(MessagingContext);
}
