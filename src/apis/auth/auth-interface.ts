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
  roles: string[];
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
  roles: string[];
}

export interface GetUserInfoReq {
  age: number;
  avatar: string;
  email: string;
  gender: number;
  name: string;
  phone: string;
}

export interface GetUserInfoResp {
  age: number;
  avatar: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: number;
  name: string;
  phone: string;
  roles: string[];
}
