import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { User } from '../interface/User';
import { Message } from '../interface/Message';
import { Conversation } from '../interface/Conversation';
import { useAuth } from './useAuthContext';
import fetchConversations from '../helpers/APICalls/getConversations';
import fetchUser from '../helpers/APICalls/getUserById';
import fetchMessages from '../helpers/APICalls/getMessagesByConvoId';

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

  const { loggedInUser } = useAuth();

  const updateConversations = (convo: IMessagingData) => {
    setConversations((prev) => [...prev, convo]);
  };

  useEffect(() => {
    let active = true;

    const getAndSaveConvos = async () => {
      const response = await fetchConversations();

      if (active && response && response.conversations) {
        const messagingData = response.conversations.map((convo) => {
          let messageDataObj: IMessagingData = { conversation: convo };
          const participantId = convo.participants?.find((participant: string) => participant !== loggedInUser?.id);

          const getParticipant = async (participantId: string) => {
            const response = await fetchUser({
              id: participantId,
            });

            if (active && response && response.user) {
              messageDataObj = { ...messageDataObj, participant: response.user };
            }
          };

          const getMessagesData = async (convoID: string) => {
            const response = await fetchMessages({
              convoID,
            });

            if (active && response && response.lastMessage && response.messages) {
              messageDataObj = { ...messageDataObj, messages: response.messages, lastMessage: response.lastMessage };
            }
          };

          if (participantId && convo) {
            getParticipant(participantId);
            getMessagesData(convo._id);
          }

          return messageDataObj;
        });

        if (messagingData) {
          setConversations(messagingData);
        }
      }
    };

    getAndSaveConvos();

    return () => {
      active = false;
    };
  }, [loggedInUser]);

  return (
    <MessagingContext.Provider value={{ conversations, updateConversations }}>{children}</MessagingContext.Provider>
  );
};

export function useMessages(): IMessagingContext {
  return useContext(MessagingContext);
}
