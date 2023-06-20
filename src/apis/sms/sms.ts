import { request } from "@/apis/schema";

export function sendSMS(): Promise<any> {
  return request({
    url: `/sms/send`,
    method: "POST",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}
