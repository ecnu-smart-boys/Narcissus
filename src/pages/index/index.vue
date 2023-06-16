<template>
  <view>
    <view class="card relative">
      <view class="consult-user">
        <img class="avatar" :src="loginInfo.avatar" />
        <view class="user-info-wrapper">
          <view class="user-info-name">{{ loginInfo.name }}</view>
          <view class="user-info-phone">{{ loginInfo.phone }}</view>
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
    <template v-for="item of consultations" :key="item.id">
      <consult-record
        :avatar="item.avatar"
        :consultant-name="item.consultantName"
        :start-time="item.startTime"
        :end-time="item.endTime"
        :score="item.score"
      />
    </template>
    <view v-if="consultations.length === 0" class="no-info-wrapper">
      <img src="/static/message.png" class="icon-no-info" />
      <view>暂无咨询内容</view>
      <view>请点击立刻在线咨询</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ConsultRecord from "@/components/consult-record.vue";
import { Pages } from "@/utils/url";
import { getConsultations } from "@/apis/auth/auth";
import { ConsultationsInfo } from "@/apis/auth/auth-interface";
import { ref } from "vue";

let loginInfo;
let consultations = ref<ConsultationsInfo[]>([]);

getLoginInformation();
getConsultationsInfo();
function getLoginInformation() {
  try {
    loginInfo = uni.getStorageSync("LoginInfo");
    console.log(loginInfo);
    if (loginInfo) {
      if (loginInfo.avatar === "") {
        loginInfo.avatar = "../../static/default-avatar.png";
      }
      console.log(loginInfo.avatar);
    } else {
      console.log("用户信息不存在");
      return null;
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    return null;
  }
}
function getConsultationsInfo() {
  try {
    getConsultations().then((res) => {
      console.log(res);
      let cnt = 0;
      for (let item of res) {
        let tempAvatar = "";
        if (item.avatar === "") {
          tempAvatar = "/static/default-avatar.png";
        }
        consultations.value.push({
          avatar: tempAvatar,
          consultantName: item.consultantName,
          endTime: formatTimestamp(item.endTime),
          score: item.score,
          startTime: formatTimestamp(item.startTime),
          state: item.state,
          id: cnt
        });
        cnt++;
      }
      console.log(consultations);
    });
  } catch (error) {
    console.error("获取咨询师信息失败:", error);
    return null;
  }
}
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function addLeadingZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

const editPersonalInformation = function () {
  uni.navigateTo({
    url: Pages.EditPersonalInformation
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
