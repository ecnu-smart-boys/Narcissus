export interface AvailableConsultant {
  consultantId: string;
  avatar: string;
  name: string;
  hasConsulted: boolean;
  state: number;
  avgComment: number;
}

export interface AllDetailsResp {
  consultationInfo: ConsultationInfo;
  consultation: MessageInfo[];
  visitorScore: number;
  visitorText: string;
  tag: string;
  consultantText: string;
}

export interface ConsultationInfo {
  consultationId: string;
  consultantId: string;
  visitorId: string;
  consultantName: string;
  consultantAvatar: string;
  phone: string;
  visitorName: string;
  visitorAvatar: string;
  startTime: number;
  lastTime: number;
  isEnd: boolean;
}

export interface MessageInfo {
  fromId: string;
  toId: string;
  iterator: number;
  msgBody: string;
  msgKey: string;
  time: number;
  revoked: boolean;
}

export interface StartConsultReq {
  toId: string;
}

export interface EndConsultReq {
  conversationId: string;
}
export interface LeftConversation {
  conversationId: string;
  userId: string;
  name: string;
  avatar: string;
  isEnd: boolean;
  startTime: number;
}

export interface ConversationState {
  state: number;
  conversation: LeftConversation;
  startTime: number;
}
