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

export interface MessageList {
  ID?: string;
  atUserList?: any[];
  avatar?: string;
  clientSequence?: number;
  clientTime: number;
  cloudCustomData?: string;
  conversationID: string;
  conversationSubType?: any;
  conversationType?: string;
  flow: string;
  from: string;
  isBroadcastMessage?: boolean;
  isDeleted?: boolean;
  isModified?: boolean;
  isPeerRead?: boolean;
  isPlaceMessage?: number;
  isRead: boolean;
  isResend?: boolean;
  isRevoked: boolean;
  isSupportExtension?: boolean;
  isSystemMessage?: boolean;
  nameCard?: string;
  needReadReceipt?: boolean;
  nick?: string;
  payload: any;
  priority?: string;
  protocol?: string;
  random?: number;
  readReceiptInfo?: any;
  revoker?: null | any;
  senderTinyID?: string;
  sequence?: number;
  status?: string;
  time: number;
  to: string;
  type: string;
  version?: number;
}

export interface ImageInfo {
  URL: string;
  Size: number;
  Type: number;
  Width: number;
  Height: number;
}

export interface ImageElem {
  UUID: string;
  ImageFormat: number;
  ImageInfoArray: ImageInfo[];
}

export interface SoundElem {
  Url: string;
  Size: number;
  UUID: number;
  Second: number;
  Download_Flag: number;
}

export interface MessageBackend {
  MsgType: string;
  MsgContent: ImageElem | SoundElem | TextElem | CustomElem;
}

export interface TextElem {
  Text: string;
}

export interface CustomElem {
  Data: string;
  Desc: string;
  Ext: string;
}
