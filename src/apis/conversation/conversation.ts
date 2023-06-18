import { request } from "@/apis/schema";
import {
  AllDetailsResp,
  AvailableConsultant
} from "@/apis/conversation/conversation-interface";

export function getAvailableConsultants(): Promise<AvailableConsultant[]> {
  return request({
    url: "/conversation/availableConsultants",
    method: "GET",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}

export function getVisitorConsultationMsg(
  conversationId: string
): Promise<AllDetailsResp> {
  return request({
    url: `/im/details/visitorConsultationList?conversationId=${conversationId}`,
    method: "GET",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}
