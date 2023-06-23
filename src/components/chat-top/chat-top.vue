<template>
  <view class="page">
    <image
      :src="avatar === '' ? '/static/default-avatar.png' : avatar"
      class="user-img"
    ></image>
    <view class="info">
      <view class="name">{{ name }}</view>
      <view class="status">{{
        status == 1 ? "正在咨询中" : status == 2 ? "排队中" : "会话已结束"
      }}</view>
      <view class="time">{{ parseTime(realTime / 1000) }}</view>
    </view>
    <view v-if="status == 1" class="right">
      <view class="shang" @tap="redirectToEvaluate">
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
    <view v-if="status == 2" class="right">
      <view class="shang" @tap="cancelQueue">
        <image
          class="zixun"
          src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/5ae39900-330c-4676-ac90-6608e4451ea4.png"
        ></image>
        <view class="tiaozhuan">取消排队</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watchEffect } from "vue";
import { Pages } from "@/utils/url";
import { parseTime } from "@/utils/time";
import { cancelWaiting } from "@/apis/conversation/conversation";

const props = defineProps<{
  status: number; // 1 正常会话，2 排队，0 会话结束
  toId: string;
  conversationId: string;
  name: string;
  avatar: string;
  startTime: number;
  endTime?: number;
  shouldStop: boolean;
}>();

const redirectToEvaluate = () => {
  uni.$emit("tap-event", { data: "open" });
};

let realTime = ref(0);
let timer: any = null;

const init = () => {
  clearInterval(timer);
  if (props.endTime) {
    realTime.value = props.endTime - props.startTime;
    return;
  }
  if (props.status == 1 || props.status == 2) {
    // 正常会话或排队，需要判断是否有startTime，如果没有则从当前时间算起
    let nowTime = new Date().getTime();
    if (props.startTime == 0) {
      nowTime = new Date().getTime();
    } else {
      nowTime = props.startTime;
    }
    timer = setInterval(() => {
      realTime.value = new Date().getTime() - nowTime;
    }, 1000);
  } else if (props.status == 0) {
    realTime.value = 0;
  }
};
watchEffect(() => {
  if (props.shouldStop) {
    clearInterval(timer);
  }
});

watchEffect(() => {
  init();
});

init();

onUnmounted(() => {
  clearInterval(timer);
});

const selectRecord = () => {
  uni.navigateTo({
    url: `${Pages.SelectRecord}?toId=${props.toId}`
  });
};

const cancelQueue = async () => {
  await cancelWaiting();
  await uni.switchTab({
    url: Pages.Index
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
