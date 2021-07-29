export interface Message {
  _id: string;
  conversationID: string;
  senderID: string;
  message: string;
  read: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface Messages {
  messages?: Message[];
  lastMessage?: Message;
  error?: { message: string };
}

export interface NewMessage {
  message?: Message;
  error?: { message: string };
}
