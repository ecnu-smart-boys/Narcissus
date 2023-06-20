<template>
  <view class="card">
    <view class="consult-record-wrapper">
      <view class="consult-time"> {{ props.time }} </view>
      <img class="icon-quit" src="/static/quit.png" />
      <view class="consult-info">
        <view class="consult-info-left">
          <img class="consult-avatar" :src="props.avatar" />
          <text class="consult-name">{{ props.consultantName }}</text>
        </view>
        <view class="consult-info-right">
          <view class="time-info">
            <view>咨询用时</view>
            <view class="consult-info-duration">{{ props.duration }}</view>
          </view>
          <view>我的评价</view>
          <StarsRating :stars-index="props.score" :is-edit-stars="false" />
        </view>
        <view :class="state == 1 ? 'status-color-green' : 'status-color-red'">{{
          state == 1 ? "在线" : state == 0 ? "离线" : "忙碌"
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import StarsRating from "@/components/stars-rating.vue";

let props = defineProps<{
  avatar: string;
  time: string;
  consultantName: string;
  duration: string;
  score: number;
  state: number;
}>();
</script>

<style lang="scss" scoped>
.status-color-green {
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;

  border-bottom-right-radius: 20rpx;
  border-top-left-radius: 20rpx;
  padding: 20rpx;
  background-color: #3dd58c;
}

.status-color-red {
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;

  border-bottom-right-radius: 20rpx;
  border-top-left-radius: 20rpx;
  padding: 20rpx;
  background-color: #da2f57;
}

.card {
  border-radius: 20rpx;
  margin: 40rpx 20rpx;
  display: flex;
  background-color: white;
  box-shadow: 0 0 30px rgba(197, 197, 197, 0.5);
}

.consult-record-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  .icon-quit {
    width: 45rpx;
    height: 45rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
  }

  .consult-time {
    padding: 20rpx;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px rgba(192, 192, 192, 0.5) solid;
  }

  .consult-info {
    display: flex;
    .consult-info-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15rpx 0;
      .consult-avatar {
        border-radius: 50%;
        width: 25vw;
        height: 25vw;
        margin: 30rpx;
      }
      .consult-name {
        margin: 10rpx 0 20rpx;
      }
    }
    .consult-info-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: medium;
      view {
        margin: 8 rpx 0;
        color: grey;
      }
      .consult-info-duration {
        color: black;
      }
    }
    .time-info {
      display: flex;
      align-items: center;
    }

    .time-info > view:first-child {
      margin-right: 10px;
    }

    .time-info .consult-info-duration {
      color: black;
    }

    .consult-info-right > view {
      margin: 8rpx 0;
      color: grey;
    }
  }
}
</style>
