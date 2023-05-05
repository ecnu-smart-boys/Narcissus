import {
  LoginWxReq,
  RegisterWxReq,
  LoginWxResp,
  RegisterWxResp
} from "@/apis/auth/auth-interface";
import { request } from "@/apis/schema";

export function loginWx(req: LoginWxReq): Promise<LoginWxResp> {
  return request({
    url: "/wx/login",
    data: req,
    method: "POST"
  });
}

export function registerWx(req: RegisterWxReq): Promise<RegisterWxResp> {
  return request({
    url: "/wx/register",
    data: req,
    method: "POST"
  });
}
