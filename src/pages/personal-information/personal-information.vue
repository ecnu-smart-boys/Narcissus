<template>
  <view class="update-wrapper">
    <view class="update-weixin-user">
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <img class="avatar" :src="avatarUrl" />
      </button>
    </view>
    <view class="update-line">
      <text class="update-label">昵称</text>
      <input
        v-model="nickName"
        class="update-input"
        type="nickname"
        placeholder="请输入昵称"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">真实姓名</text>
      <input
        v-model="userInfo.name"
        class="update-input"
        placeholder="请输入真实姓名"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">性别</text>
      <radio-group class="update-radio-group">
        <label class="radio">
          <radio value="1" color="rgb(50, 200, 210)" />男
        </label>
        <label class="radio">
          <radio value="2" color="rgb(50, 200, 210)" />女
        </label>
      </radio-group>
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">年龄</text>
      <input
        v-model="userInfo.age"
        class="update-input"
        placeholder="请输入年龄"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">联系电话</text>
      <input
        v-model="userInfo.phone"
        class="update-input"
        placeholder="请输入电话"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">紧急联系人</text>
      <input
        v-model="userInfo.name"
        class="update-input"
        placeholder="请输入紧急联系人"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">紧急联系人电话</text>
      <input
        v-model="userInfo.name"
        class="update-input"
        placeholder="请输入联系人电话"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <button class="submit" @tap="submit">保存</button>
  </view>
</template>

<script setup lang="ts">
import { GetUserInfoReq } from "@/apis/auth/auth-interface";
import { reactive, ref } from "vue";
import { Pages } from "@/utils/url";
declare const wx: any;

const userInfo: GetUserInfoReq = reactive({
  age: 0,
  avatar: "",
  email: "",
  gender: 0,
  name: "",
  phone: ""
});

function getUserInformation() {
  try {
    const resData = localStorage.getItem("userInfo");
    console.log(resData);
    if (resData) {
      /*userInfo.age = resData.age;
      userInfo.avatar = resData.avatar;
      userInfo.email = resData.email;
      userInfo.gender = resData.gender;
      userInfo.name = resData.name;
      userInfo.phone = resData.phone;*/
    } else {
      console.log("用户信息不存在");
      return null;
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    return null;
  }
}
getUserInformation();

let avatarUrl = ref(
  uni.getStorageSync("avatarUrl")
    ? uni.getStorageSync("avatarUrl")
    : "../../static/default-avatar.png"
);

let nickName = ref(
  uni.getStorageSync("nickName") ? uni.getStorageSync("nickName") : "微信用户"
);
const submit = function () {
  console.log(userInfo.name);
};

const onChooseAvatar = function (e: any) {
  avatarUrl.value = e.detail.avatarUrl;
};
</script>

<style lang="scss" scoped>
.update-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 50rpx;
  font-size: small;

  .update-radio-group {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }

  .update-line {
    display: flex;
    justify-content: space-between;
    margin: 30rpx 0;

    .update-input {
      text-align: right;
      display: flex;
    }

    .update-label {
      letter-spacing: 2rpx;
      font-weight: normal;
    }
  }
}

.div-line {
  width: 100%;
  height: 3upx;
  background-color: #e0e3da;
}

.update-weixin-user {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .avatar {
    border-radius: 50%;
    width: 35vw;
    height: 35vw;
  }
  .nickname {
    margin: 20rpx;
    font-size: 40rpx;
  }
  .tip-text {
    margin: 20rpx;
    font-size: 50rpx;
  }
}

.submit {
  background-color: rgb(50, 200, 210);
  color: white;
  font-weight: 700;
  letter-spacing: 3rpx;
  margin: 50rpx 0 50rpx;
  border-radius: 20rpx;
}

.avatar-wrapper {
  background-color: transparent;
  border-radius: 50%;
  margin: 30rpx;
}
</style>
