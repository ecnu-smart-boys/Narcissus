import { loginWxReq } from "@/apis/auth/auth-interface";
import { request } from "@/apis/schema";

export function loginWx(req: loginWxReq) {
  return request({
    url: "/wx/login",
    data: req,
    method: "POST"
  });
}
