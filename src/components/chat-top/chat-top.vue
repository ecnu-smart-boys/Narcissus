<template>
  <view class="page">
    <image :src="consultImg" class="user-img"></image>
    <view class="info">
      <view class="name">咨询师</view>
      <view class="status">当前正在咨询中</view>
      <view class="time">00:13:13</view>
    </view>
    <view class="right">
      <view class="shang">
        <image
          class="zixun"
          src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/5ae39900-330c-4676-ac90-6608e4451ea4.png"
        ></image>
        <view class="tiaozhuan">咨询完成</view>
      </view>
      <view class="xia" @tap="selectRecord">
        <image
          class="zixun"
          src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/f53221f3-c66f-4516-94a2-7ce090a7b586.png"
        ></image>
        <view class="tiaozhuan">发送记录</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Pages } from "@/utils/url";

let consultImg = ref(
  "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg"
);
const selectRecord = function () {
  uni.navigateTo({
    url: Pages.SelectRecord
  });
};
</script>

<style lang="scss" scoped>
.page {
  background: #ffffff;
  display: flex;
  flex-direction: row;
  height: 250rpx;
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

.right {
  margin-left: 50rpx;
  border-left: 2px solid #b0b0b4;
  padding-left: 20rpx;

  .shang {
    width: 150rpx;
    border-bottom: 2px solid #b0b0b4;

    .zixun {
      width: 65rpx;
      height: 65rpx;
      margin-left: 30rpx;
    }
  }

  .xia {
    margin-top: 10rpx;

    .zixun {
      width: 65rpx;
      height: 65rpx;
      margin-left: 30rpx;
    }
  }
}

.tiaozhuan {
  color: #c8c7cc;
  font-size: 30rpx;
}
</style>
