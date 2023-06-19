<template>
  <view class="list-title">选择咨询师</view>
  <view
    v-for="item in availableConsultant"
    :key="item.consultantId"
    class="card relative"
    @tap="handleClick(item)"
  >
    <view class="consult-info">
      <view class="consult-info-left">
        <image class="consult-avatar" :src="item.avatar" />
      </view>
      <view class="consult-info-right">
        <view style="display: flex; align-items: center">
          <view class="consult-name">{{ item.name }}</view>
          <view class="bread">{{
            item.hasConsulted == true ? "咨询过" : "未咨询"
          }}</view>
        </view>
        <view>综合评价</view>
        <StarsRating :stars-index="item.avgComment" :is-edit-stars="false" />
      </view>
    </view>
    <view
      :class="item.state == 1 ? 'status-color-green' : 'status-color-red'"
      >{{ item.state == 1 ? "空闲" : "忙碌" }}</view
    >
  </view>
  <view v-if="availableConsultant.length == 0" class="no-info-wrapper">
    <img src="/static/message.png" class="icon-no-info" />
    <view>暂无在线咨询师</view>
  </view>
</template>

<script setup lang="ts">
import StarsRating from "@/components/stars-rating.vue";
import { onLoad } from "@dcloudio/uni-app";
import { reactive } from "vue";
import {
  getAvailableConsultants,
  startConversation
} from "@/apis/conversation/conversation";
import { AvailableConsultant } from "@/apis/conversation/conversation-interface";
import { Pages } from "@/utils/url";

const availableConsultant = reactive<AvailableConsultant[]>([]);
onLoad(async () => {
  const data = await getAvailableConsultants();
  data.forEach((i) => {
    if (i.avatar == "") {
      i.avatar = "/static/default-avatar.png";
    }
  });
  availableConsultant.splice(0);
  availableConsultant.push(...data);
});

const handleClick = async (item: AvailableConsultant) => {
  await startConversation({
    toId: item.consultantId
  });
  await uni.redirectTo({
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

.status-color-green {
  position: absolute;
  top: 0;
  right: 0;
  color: white;

  border-bottom-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 20rpx;
  background-color: #3dd58c;
}

.status-color-red {
  position: absolute;
  top: 0;
  right: 0;
  color: white;

  border-bottom-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 20rpx;
  background-color: #da2f57;
}

.no-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .icon-no-info {
    width: 30vw;
    height: 30vw;
  }

  view {
    color: #999999;
  }
}
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>
