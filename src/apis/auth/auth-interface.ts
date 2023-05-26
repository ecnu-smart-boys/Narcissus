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
  emergencyContact: string;
  emergencyPhone: string;
  gender: number;
  name: string;
  phone: string;
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

export interface UpdateWxReq {
  age: number;
  avatar: string;
  email: string;
  gender: number;
  name: string;
  phone: string;
}

export interface UpdateWxResp {
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
