<template>
  <view class="page">
    <image :src="consultImg" class="user-img"></image>
    <view class="info">
      <view class="name">咨询师</view>
      <view class="status">当前正在咨询中</view>
      <view class="time">00:13:13</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let consultImg = ref(
  "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg"
);
</script>

<style lang="scss" scoped>
.page {
  background: #ffffff;
  display: flex;
  flex-direction: row;
}

.user-img {
  margin-left: 50rpx;
  margin-bottom: 50rpx;
  margin-top: 50rpx;
  width: 150rpx;
  height: 150rpx;
  border-radius: 75rpx;
}

.info {
  margin-top: 50rpx;
  margin-left: 50rpx;

  .name {
    font-size: 35rpx;
    color: #999ea9;
  }

  .status {
    margin-top: 10rpx;
    font-size: 35rpx;
    color: #83e36f;
  }

  .time {
    margin-top: 10rpx;
    font-size: 50rpx;
    color: #424b4d;
  }
}
</style>
