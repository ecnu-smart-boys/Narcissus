import {
  LoginWxReq,
  RegisterWxReq,
  LoginWxResp,
  RegisterWxResp,
  UpdateUserInfoWxReq,
  UpdateUserInfoWxResp,
  ConsultationsWxResp,
  VisitorCommentWxReq,
  VisitorCommentWxResp
} from "@/apis/auth/auth-interface";
import { request } from "@/apis/schema";

export function loginWx(req: LoginWxReq): Promise<LoginWxResp> {
  return request({
    url: "/auth/login-wx",
    data: req,
    method: "POST"
  });
}

export function registerWx(req: RegisterWxReq): Promise<RegisterWxResp> {
  return request({
    url: "/auth/register",
    data: req,
    method: "POST"
  });
}

export function updateUserInfoWx(
  req: UpdateUserInfoWxReq
): Promise<UpdateUserInfoWxResp> {
  return request({
    url: "/user/info",
    data: req,
    method: "PUT",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}

export function getConsultations(): Promise<ConsultationsWxResp[]> {
  return request({
    url: "/conversation/visitor/consultations",
    method: "GET",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}

export function visitorComment(
  req: VisitorCommentWxReq
): Promise<VisitorCommentWxResp> {
  return request({
    url: "/conversation/visitorComment",
    data: req,
    method: "POST",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}