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
import {
  ConsultationInfo,
  MessageBackend,
  MessageInfo,
  TextElem
} from "@/apis/conversation/conversation-interface";
import { Pages } from "@/utils/url";

const props = defineProps<{
  payload: {
    data: string; // MessageInfo[]的JSON字符串
    description: string;
    extension: string;
  };
}>();
const excerpt = ref("");

const handleClick = () => {
  const json: {
    consultationInfo: ConsultationInfo;
    messageInfo: MessageInfo[];
  } = JSON.parse(props.payload.data);
  uni.navigateTo({
    url: `${Pages.DetailRecord}?conversationId=${json.consultationInfo.consultationId}`
  });
};

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
    const fromName =
      i.fromId == json.consultationInfo.consultantId
        ? json.consultationInfo.consultantName
        : json.consultationInfo.visitorName;
    const data = JSON.parse(i.msgBody)[0] as MessageBackend;
    if (data.MsgType === "TIMTextElem") {
      const payload = data.MsgContent as TextElem;
      excerpt.value +=
        `${fromName}: ${payload.Text}`.replace(/\n/g, " ") + "\n";
    } else if (data.MsgType === "TIMImageElem") {
      excerpt.value += `${fromName}: [图片]\n`;
    } else if (data.MsgType === "TIMSoundElem") {
      excerpt.value += `${fromName}: [语音]\n`;
    } else if (data.MsgType === "TIMCustomElem") {
      excerpt.value += `${fromName}: [转发消息]\n`;
    }
  });
});

function timestampToTime(timestamp: any) {
  timestamp = timestamp ? timestamp : null;
  if (String(timestamp).length < 13) timestamp *= 1000;
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
