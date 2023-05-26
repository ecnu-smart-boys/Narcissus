<template>
  <view class="list-title">
    <view class="title-name">选择咨询记录</view>
    <view class="deliver-record" @tap="onlineConsult">发送</view>
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
                <checkbox :value="item.id" :checked="item.checked" />
              </view>
            </view>
          </label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Pages } from "@/utils/url";
import { reactive } from "vue";
const onlineConsult = function () {
  uni.navigateTo({
    url: Pages.OnlineConsult
  });
};

let record = reactive<
  {
    id: string;
    time: string;
    name: string;
    checked: boolean;
  }[]
>([
  {
    id: "1",
    time: "2023/05/11 22:56",
    name: "xxx",
    checked: false
  },
  {
    id: "2",
    time: "2023/05/12 10:08",
    name: "yyy",
    checked: false
  }
]);
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
  .record-name {
    font-size: medium;
    padding: 10rpx;
  }
  .last-record-time {
    font-size: medium;
    padding: 10rpx;
  }
  .record-checkbox {
    padding: 40rpx;
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
