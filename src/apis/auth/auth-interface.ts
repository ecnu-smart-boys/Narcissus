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
  roles: string;
  username: string;
  emergencyContact: string;
  emergencyPhone: string;
  totalTime: number;
  idNumber: string;
  department: string;
  title: string;
  qualification: string;
  qualificationCode: string;
  arrangement: string;
  consultTimes: string;
  consultantList: [
    {
      id: string;
      name: string;
      avatar: string;
    }
  ];
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

export interface updateUserInfoWxReq {
  age: number;
  avatar: string;
  email: string;
  gender: number;
  nickName: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface updateUserInfoWxResp {
  age: number;
  avatar: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: number;
  nickName: string;
  phone: string;
  roles: string;
}
