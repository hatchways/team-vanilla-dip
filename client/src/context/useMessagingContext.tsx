import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { MessagingData } from '../interface/Message';
import { useAuth } from './useAuthContext';
import fetchConversations from '../helpers/APICalls/getConversations';
import fetchUser from '../helpers/APICalls/getUserById';
import fetchMessages from '../helpers/APICalls/getMessagesByConvoId';
import { getProfile } from '../helpers/APICalls/getProfile';

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
    const existingConvo = conversations.filter(
      (conversation) => conversation.conversation._id === convo.conversation._id,
    );
    if (existingConvo.length > 0) {
      const uniqueConvoList = conversations.filter(
        (convo) => convo.conversation._id !== existingConvo[0].conversation._id,
      );

      const updatedConvoList = [convo, ...uniqueConvoList];
      setConversations(updatedConvoList);
      return;
    }
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

  const fetchProfile = async (userID: string) => {
    const response = await getProfile({ userID });

    if (response && response.profile) {
      return response.profile[0];
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
            profile: {
              profileImage: '',
              userID: '',
            },
          };

          if (participantId && convo) {
            const participant = await getParticipant(participantId);
            const messagesData = await getMessagesData(convo._id);
            const profile = await fetchProfile(participantId);
            if (participant && messagesData?.messages && messagesData?.lastMessage && profile) {
              messageDataObj = {
                ...messageDataObj,
                participant,
                messages: messagesData.messages,
                lastMessage: messagesData.lastMessage,
                profile,
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
      setConversations([]);
    };
  }, [loggedInUser]);

  return (
    <MessagingContext.Provider value={{ conversations, updateConversations }}>{children}</MessagingContext.Provider>
  );
};

export function useMessages(): IMessagingContext {
  return useContext(MessagingContext);
}
