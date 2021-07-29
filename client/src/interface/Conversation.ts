export interface Conversation {
  _id: string;
  participants: string[];
  updatedAt: string;
}

export interface Conversations {
  conversations?: Conversation[];
  error?: { message: string };
}

export interface NewConversation {
  conversation?: Conversation;
  error?: { message: string };
}
