export interface Message {
    id: string;
    conversationId: string;
    textContent: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
    messageType: MessageType;
}
  
export enum MessageType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
}
  