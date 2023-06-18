import { request } from "@/apis/schema";
import { AvailableConsultant } from "@/apis/conversation/conversation-interface";

export function getAvailableConsultants(): Promise<AvailableConsultant[]> {
  return request({
    url: "/conversation/availableConsultants",
    method: "GET",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}
