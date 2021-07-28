export interface Conversation {
  id: string;
  participants: string[];
}

export interface Conversations {
  conversations?: Conversation[];
  error?: { message: string };
}
