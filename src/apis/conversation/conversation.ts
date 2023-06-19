import { request } from "@/apis/schema";
import {
  AllDetailsResp,
  AvailableConsultant,
  ConsultationInfo,
  ConversationState,
  EndConsultReq,
  LeftConversation,
  StartConsultReq
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

export function startConversation(
  startConsultReq: StartConsultReq
): Promise<LeftConversation> {
  return request({
    url: `/conversation/consult`,
    method: "POST",
    data: startConsultReq,
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}

export function getConversation(): Promise<LeftConversation> {
  return request({
    url: `/conversation/currentConsultation`,
    method: "GET",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}

export function endConsultation(endConsultReq: EndConsultReq): Promise<any> {
  return request({
    url: `/conversation/endConsultation`,
    method: "POST",
    data: endConsultReq,
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}

export function conversationState(): Promise<ConversationState> {
  return request({
    url: `/conversation/onlineState`,
    method: "GET",
    header: {
      "x-freud": uni.getStorageSync("accessToken")
    }
  });
}
