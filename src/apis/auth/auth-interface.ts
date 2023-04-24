export interface loginWxReq {
  code: string;
}

export interface loginWxResp {
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
