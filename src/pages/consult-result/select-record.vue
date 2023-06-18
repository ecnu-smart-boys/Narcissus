<template>
  <view class="list-title">
    <view class="title-name">选择咨询记录</view>
    <view class="deliver-record" @tap="handleSend">发送</view>
  </view>

  <view class="uni-list">
    <view class="card relative">
      <view class="record-info">
        <checkbox-group>
          <label
            v-for="item in record"
            :key="item.id"
            class="uni-list-cell uni-list-cell-pd"
          >
            <view style="display: flex; align-items: center">
              <view class="record-name">咨询师：{{ item.name }}</view>
              <view class="last-record-time">{{ item.time }}</view>
              <view class="record-checkbox">
                <checkbox :checked="item.checked" :value="item.id" />
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

const record = reactive<
  {
    conversationId: string;
    time: string;
    name: string;
    checked: boolean;
  }[]
>([]);
onLoad(async () => {
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
const handleSend = async () => {
  uni.switchTab({
    url: Pages.OnlineConsult
  });
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
