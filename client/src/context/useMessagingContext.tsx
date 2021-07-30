import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { MessagingData } from '../interface/Message';
import { useAuth } from './useAuthContext';
import fetchConversations from '../helpers/APICalls/getConversations';
import fetchUser from '../helpers/APICalls/getUserById';
import fetchMessages from '../helpers/APICalls/getMessagesByConvoId';

interface IMessagingContext {
  conversations: MessagingData[] | [];
  updateConversations: (convo: MessagingData) => void;
}

export const MessagingContext = createContext<IMessagingContext>({
  conversations: [],
  updateConversations: () => null,
});

export const MessagesProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<MessagingData[] | []>([]);

  const { loggedInUser } = useAuth();

  const updateConversations = (convo: MessagingData) => {
    setConversations((prev) => [...prev, convo]);
  };

  const getParticipant = async (participantId: string) => {
    const response = await fetchUser({
      id: participantId,
    });

    if (response && response.user) {
      return response.user;
    }
  };

  const getMessagesData = async (convoID: string) => {
    const response = await fetchMessages({
      convoID,
    });

    if (response && response.lastMessage && response.messages) {
      return { messages: response.messages, lastMessage: response.lastMessage };
    }
  };

  useEffect(() => {
    let active = true;

    const getAndSaveConvos = async () => {
      const response = await fetchConversations();

      if (active && response && response.conversations) {
        const messagingDataPromises = response.conversations.map(async (convo) => {
          const participantId = convo.participants?.find((participant: string) => participant !== loggedInUser?.id);

          let messageDataObj: MessagingData = {
            conversation: convo,
            participant: null,
            messages: [],
            lastMessage: null,
          };

          if (participantId && convo) {
            const participant = await getParticipant(participantId);
            const messagesData = await getMessagesData(convo._id);
            if (participant && messagesData?.messages && messagesData?.lastMessage) {
              messageDataObj = {
                ...messageDataObj,
                participant,
                messages: messagesData.messages,
                lastMessage: messagesData.lastMessage,
              };
              return messageDataObj;
            }
          }
          return messageDataObj;
        });
        const messagingData = await Promise.all(messagingDataPromises);
        setConversations(messagingData);
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
