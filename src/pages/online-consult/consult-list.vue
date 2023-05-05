<template>
  <view class="list-title">选择咨询师</view>
  <view class="card relative">
    <view class="consult-info">
      <view class="consult-info-left">
        <img class="consult-avatar" src="/static/default-avatar.png" />
      </view>
      <view class="consult-info-right">
        <view style="display: flex; align-items: center">
          <view class="consult-name">咨询师</view>
          <view class="bread">咨询过</view>
        </view>
        <view>综合评价</view>
        <StarsRating :stars-index="4" :is-edit-stars="false" />
      </view>
    </view>
    <view class="status status-color">空闲</view>
  </view>
  <view class="card relative">
    <view class="consult-info">
      <view class="consult-info-left">
        <img class="consult-avatar" src="/static/default-avatar.png" />
      </view>
      <view class="consult-info-right">
        <view style="display: flex; align-items: center">
          <view class="consult-name">咨询师</view>
          <view class="bread">咨询过</view>
        </view>
        <view>综合评价</view>
        <StarsRating :stars-index="4" :is-edit-stars="false" />
      </view>
    </view>
    <view class="status status-color">空闲</view>
  </view>
  <view class="card relative">
    <view class="consult-info">
      <view class="consult-info-left">
        <img class="consult-avatar" src="/static/default-avatar.png" />
      </view>
      <view class="consult-info-right">
        <view style="display: flex; align-items: center">
          <view class="consult-name">咨询师</view>
          <view class="bread">咨询过</view>
        </view>
        <view>综合评价</view>
        <StarsRating :stars-index="4" :is-edit-stars="false" />
      </view>
    </view>
    <view class="status status-color">空闲</view>
  </view>
</template>

<script setup lang="ts">
import StarsRating from "@/components/stars-rating.vue";
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
.list-title {
  display: flex;
  justify-content: center;
  margin: 20rpx auto;
  font-size: 40rpx;
  font-weight: bold;
}

.card {
  border-radius: 20rpx;
  margin: 40rpx 20rpx;
  display: flex;
  background-color: white;
  box-shadow: 0 0 30px rgba(197, 197, 197, 0.5);
}
.consult-info {
  display: flex;
  .consult-info-left {
    margin: 15rpx 0;
    .consult-avatar {
      border-radius: 50%;
      width: 25vw;
      height: 25vw;
      margin: 30rpx;
    }
  }
  .consult-info-right {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .consult-name {
      font-size: larger;
      margin-right: 20rpx;
    }
    .bread {
      border-radius: 10rpx;
      color: white;
      padding: 10rpx;
      background-color: #b0b0b0;
    }
    view {
      margin: 8rpx 0;
      color: grey;
    }
  }
}
.status {
  position: absolute;
  top: 0;
  right: 0;
  color: white;

  border-bottom-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 20rpx;
}

.status-color {
  background-color: #3dd58c;
  //background-color: #da2f57;
}
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>
