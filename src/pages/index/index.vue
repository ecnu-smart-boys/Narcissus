<template>
  <view @tap="testRegister">注册</view>
  <view>
    <view class="card relative">
      <view class="consult-user">
        <img class="avatar" :src="avatarUrl" />
        <view class="user-info-wrapper">
          <view class="user-info-name">{{ test.name }}</view>
          <view class="user-info-phone">{{ test.phone }}</view>
        </view>
      </view>
      <view class="consult-wrapper" @tap="startConsult">
        <view class="start-consult">立刻在线咨询</view>
      </view>
      <img
        class="icon-edit"
        src="/static/edit.png"
        @tap="editPersonalInformation"
      />
    </view>
    <template v-for="item of dummy" :key="item.id">
      <consult-record
        :duration="item.duration"
        :rate="item.rate"
        :name="item.name"
        :time="item.time"
        :avatar="item.avatar"
      />
    </template>
    <view v-if="dummy.length === 0" class="no-info-wrapper">
      <img src="/static/message.png" class="icon-no-info" />
      <view>暂无咨询内容</view>
      <view>请点击立刻在线咨询</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ConsultRecord from "@/components/consult-record.vue";
import { Pages } from "@/utils/url";
let avatarUrl = ref("../../static/default-avatar.png");

let test = uni.getStorageSync("userInfo");

const dummy = [
  {
    time: "100",
    avatar: "/static/default-avatar.png",
    name: "咨询师",
    duration: "1小时",
    rate: 4,
    id: 1
  },
  {
    time: "100",
    avatar: "/static/default-avatar.png",
    name: "咨询师",
    duration: "1小时",
    rate: 4,
    id: 2
  },
  {
    time: "100",
    avatar: "/static/default-avatar.png",
    name: "咨询师",
    duration: "1小时",
    rate: 4,
    id: 3
  }
];
const editPersonalInformation = function () {
  uni.navigateTo({
    url: Pages.EditPersonalInformation
  });
};
const testRegister = function () {
  uni.navigateTo({
    url: Pages.Register
  });
};
const startConsult = function () {
  uni.navigateTo({
    url: Pages.InformedConsent
  });
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
.icon-edit {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  top: 30rpx;
  right: 30rpx;
}
.card {
  border-radius: 20rpx;
  margin: 40rpx 20rpx;
  background-color: white;
  box-shadow: 0 0 30px rgba(197, 197, 197, 0.5);
}

.consult-user {
  display: flex;
  height: 25vh;
  align-items: center;
  .avatar {
    border-radius: 50%;
    width: 30vw;
    height: 30vw;
    margin: 30rpx;
  }
  .user-info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30rpx;

    .user-info-name {
      font-size: 50rpx;
    }

    .user-info-phone {
      color: gray;
    }
  }
}

.consult-wrapper {
  display: flex;
  height: 10vh;
  align-items: center;
  background-color: rgb(50, 200, 210);
  width: 100%;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;

  .start-consult {
    color: white;
    font-size: 40rpx;
    margin: 60rpx 30rpx;
  }
}

.no-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;

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
