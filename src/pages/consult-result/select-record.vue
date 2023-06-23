<template>
  <view class="list-title">
    <view class="title-name">选择咨询记录</view>
    <button class="deliver-record" @tap="handleSend">发送</button>
  </view>

  <view class="uni-list">
    <view class="card relative">
      <view class="record-info">
        <checkbox-group @change="checkboxChange">
          <label v-for="item in record" :key="item.conversationId">
            <view
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <view class="record-name">咨询师：{{ item.name }}</view>
              <view class="last-record-time">{{ item.time }}</view>
              <view class="record-checkbox">
                <checkbox
                  :checked="item.checked"
                  :value="item.conversationId"
                />
              </view>
            </view>
          </label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Pages } from "@/utils/url";
import { reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getConsultations } from "@/apis/auth/auth";
import { parseTimestamp } from "@/utils/time";
import { getVisitorConsultationMsg } from "@/apis/conversation/conversation";
import tim from "@/utils/im";
import TIM from "tim-js-sdk";

let toId = "";

const record = reactive<
  {
    conversationId: string;
    time: string;
    name: string;
    checked: boolean;
  }[]
>([]);
onLoad(async (options: any) => {
  // 从上个页面获得toId
  toId = options.toId;
  const data = await getConsultations();
  record.splice(0);
  data.forEach((item) => {
    record.push({
      conversationId: item.conversationId,
      time: parseTimestamp(item.startTime),
      name: item.consultantName,
      checked: false
    });
  });
});
const checkboxChange = (e: any) => {
  const values = e.detail.value;
  record.forEach((item) => {
    item.checked = !!values.includes(item.conversationId);
  });
};
const handleSend = async () => {
  const conversationIds = record
    .filter((i) => i.checked)
    .map((i) => getVisitorConsultationMsg(i.conversationId));
  const data = await Promise.all(conversationIds);
  const jsonMessages = data
    .map((i) => {
      return JSON.stringify({
        consultationInfo: i.consultationInfo,
        messageInfo: i.consultation
      });
    })
    .map((i) => {
      return tim.createCustomMessage({
        to: toId,
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          data: i,
          description: "",
          extension: ""
        }
      });
    })
    .map((i) => tim.sendMessage(i));
  try {
    await Promise.all(jsonMessages);
    await uni.switchTab({
      url: Pages.OnlineConsult
    });
  } catch (e) {
    await uni.showToast({
      title: "部分历史记录发送失败",
      icon: "error"
    });
  }
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}

.list-title {
  display: flex;
  margin: 20rpx auto;

  .title-name {
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    flex: 1;
  }

  .deliver-record {
    font-size: small;
    text-align: right;
    border-radius: 10rpx;
    color: white;
    margin-right: 10px;
    background-color: rgb(50, 200, 210);
  }
}

.card {
  border-radius: 20rpx;
  margin: 40rpx 20rpx;
  display: flex;
  background-color: white;
  box-shadow: 0 0 30px rgba(197, 197, 197, 0.5);
}

.record-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .record-name {
    font-size: medium;
    padding: 10rpx;
  }

  .last-record-time {
    font-size: medium;
    padding: 10rpx;
  }

  .record-checkbox {
    padding: 40rpx 20rpx;
  }

  view {
    color: grey;
  }
}
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>
