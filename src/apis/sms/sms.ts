import { request } from "@/apis/schema";
import { SendSMSRequest } from "@/apis/sms/sms-interface";

export function sendSMS(sendSMSRequest: SendSMSRequest): Promise<any> {
  return request({
    url: `/sms/send`,
    method: "POST",
    data: sendSMSRequest,
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}
