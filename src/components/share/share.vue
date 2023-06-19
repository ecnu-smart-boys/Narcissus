<template>
  <view @tap="handleClick">
    <view class="forwarding-card">
      <view class="record-header">
        <view class="record-title"
          >{{ info?.consultationInfo.consultantName }}
        </view>
        <view class="record-time"
          >{{ timestampToTime(info?.consultationInfo.startTime) }}
        </view>
      </view>
      <view class="record-content">
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
}>();
const excerpt = ref("");

const handleClick = () => {
  // TODO
};
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
</script>

<style lang="scss" scoped>
.forwarding-card {
  margin-right: 16rpx;
  background-color: #a6e860;
  border-radius: 20rpx 0rpx 20rpx 20rpx;
  padding: 16rpx;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
}
.record-time {
  font-size: small;
  margin-left: 30rpx;
}
.message-sender {
  font-weight: bold;
}

.message-content {
  margin-left: 20px;
}
</style>
