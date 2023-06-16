<template>
  <view class="update-wrapper">
    <view class="update-weixin-user">
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <img class="avatar" :src="userInfo.avatar" />
      </button>
    </view>
    <view class="update-line">
      <text class="update-label">昵称</text>
      <input
        v-model="userInfo.nickName"
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
        v-model="userInfo.nickName"
        class="update-input"
        placeholder="请输入真实姓名"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="update-line">
      <text class="update-label">性别</text>
      <radio-group
        class="update-radio-group"
        value="userInfo.gender"
        @change="handleGenderChange"
      >
        <label class="radio">
          <radio
            value="1"
            :checked="userInfo.gender === 1"
            color="rgb(50, 200, 210)"
          />男
        </label>
        <label class="radio">
          <radio
            value="2"
            :checked="userInfo.gender === 2"
            color="rgb(50, 200, 210)"
          />女
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
        v-model="userInfo.emergencyContact"
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
        v-model="userInfo.emergencyPhone"
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
import { reactive } from "vue";
import {getUserInfoWx, updateUserInfoWx} from "@/apis/auth/auth";

let userInfo = reactive({
  age: 0,
  avatar: "",
  email: "",
  gender: 0,
  nickName: "",
  phone: "",
  emergencyContact: "",
  emergencyPhone: ""
});

getUserInformation();

const submit = function () {
  uni.setStorageSync("userInfo", userInfo);
  updateUserInformation();
};

const onChooseAvatar = function (e: any) {
  userInfo.avatar = e.detail.avatarUrl;
};

const handleGenderChange = function (e: any) {
  userInfo.gender = parseInt(e.detail.value);
};

function getUserInformation() {
  try {
    getUserInfoWx({}).then((res) => {
      uni.setStorageSync("userInfo", res);
    });
    const resData = uni.getStorageSync("userInfo");
    console.log(resData);
    if (resData) {
      userInfo = resData;
      userInfo.nickName = resData.name;
      if (userInfo.avatar === "") {
        userInfo.avatar = "../../static/default-avatar.png";
      }
      console.log(userInfo.nickName);
    } else {
      console.log("用户信息不存在");
      return null;
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    return null;
  }
}

function updateUserInformation() {
  updateUserInfoWx({
    age: userInfo.age,
    avatar: userInfo.avatar,
    emergencyContact: userInfo.emergencyContact,
    emergencyPhone: userInfo.emergencyPhone,
    gender: userInfo.gender,
    nickName: userInfo.nickName,
    phone: userInfo.phone,
    email: ""
  });
}
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
