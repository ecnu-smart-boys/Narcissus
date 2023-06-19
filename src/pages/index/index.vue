<template>
  <view>
    <view class="card relative">
      <view class="consult-user">
        <img class="avatar" :src="userInfo.avatar" />
        <view class="user-info-wrapper">
          <view class="user-info-name">{{ userInfo.name }}</view>
          <view class="user-info-phone">{{ userInfo.phone }}</view>
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
    <template v-for="item of consultations" :key="item.conversationId">
      <consult-record
        :avatar="item.avatar"
        :time="parseTimestamp(item.startTime)"
        :consultant-name="item.consultantName"
        :duration="formatTime(item.endTime - item.startTime)"
        :score="item.score"
        @tap="handleClick(item.conversationId)"
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
import {
  ConsultationsWxResp,
  GetUserInfoWxResp
} from "@/apis/auth/auth-interface";
import { reactive, ref } from "vue";
import { formatTime, parseTimestamp } from "@/utils/time";
import { onShow } from "@dcloudio/uni-app";

const userInfo = ref<GetUserInfoWxResp>();
const consultations = reactive<ConsultationsWxResp[]>([]);

onShow(async () => {
  getLoginInformation();
  await getConsultationsInfo();
});

function getLoginInformation() {
  try {
    userInfo.value = uni.getStorageSync("UserInfo");
    if (userInfo.value) {
      if (userInfo.value.avatar == "") {
        userInfo.value.avatar = "/static/default-avatar.png";
      }
    } else {
      uni.showToast({
        title: "用户信息不存在",
        icon: "error"
      });
      return null;
    }
  } catch (error) {
    uni.showToast({
      title: "获取用户信息失败",
      icon: "error"
    });
    return null;
  }
}
async function getConsultationsInfo() {
  const data = await getConsultations();
  data.forEach((i) => {
    if (i.avatar == "") {
      i.avatar = "/static/default-avatar.png";
    }
  });
  consultations.splice(0);
  consultations.push(...data);
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

const handleClick = (conversationId: string) => {
  uni.switchTab({
    url: `${Pages.DetailRecord}?conversationId=${conversationId}`
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
