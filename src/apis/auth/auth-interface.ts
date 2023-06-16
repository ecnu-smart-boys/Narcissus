import exp from "constants";

export interface LoginWxReq {
  code: string;
}

export interface LoginWxResp {
  age: number;
  avatar: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
  role: string;
  username: string;
}

export interface RegisterWxReq {
  age: number;
  avatar: string;
  emergencyContact: string;
  emergencyPhone: string;
  gender: number;
  name: string;
  phone: string;
  smsCode: string;
  smsCodeId: string;
  code: string;
}

export interface RegisterWxResp {
  age: number;
  avatar: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
  roles: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetUserInfoWxReq {}

export interface GetUserInfoWxResp {
  age: number;
  avatar: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
  role: string;
  username: string;
  emergencyContact: string;
  emergencyPhone: string;
}


export interface UpdateUserInfoWxReq {
  age: number;
  avatar: string;
  email: string;
  gender: number;
  nickName: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateUserInfoWxResp {}

export interface ConsultationsInfo {
  avatar: string;
  consultantName: string;
  endTime: string;
  score: number;
  startTime: string;
  state: number;
  id: number;
}

export interface ConsultationsWxResp {
  avatar: string;
  consultantName: string;
  endTime: number;
  score: number;
  startTime: number;
  state: number;
}

export interface VisitorCommentWxReq {
  conversationId: string;
  score: number;
  text: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VisitorCommentWxResp {}
