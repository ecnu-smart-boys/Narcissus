<template>
  <view>
    <!--    <view-->
    <!--      v-for="(record, index) in forwardingRecords"-->
    <!--      :key="index"-->
    <!--      class="forwarding-card"-->
    <!--    >-->
    <view class="forwarding-card">
      <view class="record-header">
        <view class="record-title"
          >{{ info?.consultationInfo.consultantName }}123
        </view>
        <view class="record-time"
          >{{ info?.consultationInfo.startTime }}456
        </view>
      </view>
      <view class="record-content">
        <!--        <view-->
        <!--          v-for="(message, messageIndex) in record.messages.slice(0, 2)"-->
        <!--          :key="messageIndex"-->
        <!--        >-->
        <!--          <view class="message-sender">{{ message.sender }}</view>-->
        <!--          <view class="message-content">{{ message.content }}</view>-->
        <!--        </view>-->
        <!--        <view v-if="record.messages.length === 1">-->
        <!--          <view class="message-sender">{{ record.messages[0].sender }}</view>-->
        <!--          <view class="message-content">{{ record.messages[0].content }}</view>-->
        <!--        </view>-->
        <view>{{ excerpt }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";

const props = defineProps<{
  payload: {
    data: string; // MessageInfo[]的JSON字符串
    description: string;
    extension: string;
  };
  shouldLoop: boolean;
}>();
const excerpt = ref("667");

interface MessageList {
  ID?: string;
  atUserList?: any[];
  avatar?: string;
  clientSequence?: number;
  clientTime: number;
  cloudCustomData?: string;
  conversationID: string;
  conversationSubType?: any;
  conversationType?: string;
  flow: string;
  from: string;
  isBroadcastMessage?: boolean;
  isDeleted?: boolean;
  isModified?: boolean;
  isPeerRead?: boolean;
  isPlaceMessage?: number;
  isRead: boolean;
  isResend?: boolean;
  isRevoked: boolean;
  isSupportExtension?: boolean;
  isSystemMessage?: boolean;
  nameCard?: string;
  needReadReceipt?: boolean;
  nick?: string;
  payload: any;
  priority?: string;
  protocol?: string;
  random?: number;
  readReceiptInfo?: any;
  revoker?: null | any;
  senderTinyID?: string;
  sequence?: number;
  status?: string;
  time: number;
  to: string;
  type: string;
  version?: number;
}

interface MessageInfo {
  fromId: string;
  toId: string;
  msgBody: string;
  time: number;
  revoked: boolean;
  iterator: number;
}

interface ConsultationInfo {
  consultantName: string;
  consultantAvatar: string;
  consultantId: string;
  phone: string;
  visitorName: string;
  visitorAvatar: string;
  visitorId: string;
  startTime: number;
  lastTime: number;
  end: boolean;
  consultationId: number;
}

interface ImageInfo {
  URL: string;
  Size: number;
  Type: number;
  Width: number;
  Height: number;
}

interface ImageElem {
  UUID: string;
  ImageFormat: number;
  ImageInfoArray: ImageInfo[];
}

interface SoundElem {
  Url: string;
  Size: number;
  UUID: number;
  Second: number;
  Download_Flag: number;
}

interface MessageBackend {
  MsgType: string;
  MsgContent: ImageElem | SoundElem | TextElem;
}

interface TextElem {
  Text: string;
}

const info = ref<{
  consultationInfo: ConsultationInfo;
  messageInfo: MessageInfo[];
}>();
const allMsg = reactive<MessageInfo[]>([]);
onMounted(async () => {
  allMsg.splice(0);
  const json: {
    consultationInfo: ConsultationInfo;
    messageInfo: MessageInfo[];
  } = JSON.parse(props.payload.data);
  info.value = json;
  allMsg.push(...json.messageInfo);
  allMsg.forEach((i) => {
    const data = JSON.parse(i.msgBody)[0] as MessageBackend;
    if (data.MsgType === "TIMTextElem") {
      const payload = data.MsgContent as TextElem;
      excerpt.value += `${i.fromId}: ${payload.Text}\n`;
    } else if (data.MsgType === "TIMImageElem") {
      excerpt.value += `${i.fromId}: [图片]\n`;
    } else if (data.MsgType === "TIMSoundElem") {
      excerpt.value += `${i.fromId}: [语音]\n`;
    } else if (data.MsgType === "TIMCustomElem") {
      excerpt.value += `${i.fromId}: [转发消息]\n`;
    }
  });
});
let forwardingRecords = reactive([
  {
    title: "与小明的聊天记录",
    time: "2023-06-15 10:20",
    messages: [
      { sender: "我", content: "你好啊" },
      { sender: "小明", content: "你好，最近怎么样？" }
    ]
  },
  {
    title: "与小李的聊天记录",
    time: "2023-06-16 14:50",
    messages: [
      { sender: "我", content: "下午好" },
      { sender: "小李", content: "下午好，你有时间帮我看一下这个问题吗？" }
    ]
  }
]);

function timestampToTime(timestamp: any) {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

function messageAdapter(message: MessageInfo, myId: string): MessageList {
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
</script>

<style lang="scss" scoped>
.forwarding-card {
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5rpx solid #9ca999;
  padding-bottom: 5rpx;
}

.record-title {
  font-weight: bold;
}

.record-content {
  margin-top: 10px;
}

.message-sender {
  font-weight: bold;
}

.message-content {
  margin-left: 20px;
}
</style>
