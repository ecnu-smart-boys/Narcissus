import {
  ImageElem,
  MessageBackend,
  MessageInfo,
  MessageList,
  SoundElem,
  TextElem
} from "@/apis/conversation/conversation-interface";

export function messageAdapter(
  message: MessageInfo,
  myId: string
): MessageList {
  let datas: MessageBackend[];
  const defaultData: MessageList = {
    clientTime: message.time,
    conversationID: "",
    flow: "",
    from: "",
    to: "",
    payload: { text: "" },
    isRead: true,
    isRevoked: message.revoked,
    time: message.time,
    type: "TIMTextElem"
  };
  try {
    datas = JSON.parse(message.msgBody);
  } catch (ignored) {
    // 默认采用空白文本
    return defaultData;
  }
  const data = datas[0];
  defaultData.type = data.MsgType;
  defaultData.from = message.fromId;
  defaultData.to = message.toId;
  defaultData.flow = message.fromId == myId ? "out" : "in";
  if (data.MsgType == "TIMTextElem") {
    const payload = data.MsgContent as TextElem;
    defaultData.payload = {
      text: payload.Text
    };
  } else if (data.MsgType == "TIMImageElem") {
    const payload = data.MsgContent as ImageElem;
    defaultData.payload = {
      imageInfoArray: [
        {
          height: payload.ImageInfoArray[0].Height,
          width: payload.ImageInfoArray[0].Width,
          imageUrl: payload.ImageInfoArray[0].URL,
          url: payload.ImageInfoArray[0].URL,
          size: payload.ImageInfoArray[0].Size
        }
      ]
    };
  } else if (data.MsgType == "TIMSoundElem") {
    const payload = data.MsgContent as SoundElem;
    defaultData.payload = {
      url: payload.Url,
      size: payload.Size,
      second: payload.Second
    };
  }
  return defaultData;
}
