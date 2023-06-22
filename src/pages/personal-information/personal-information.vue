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
import { ref } from "vue";
import { getUserInfoWx, updateUserInfoWx } from "@/apis/auth/auth";
import { Pages } from "@/utils/url";
import { onLoad } from "@dcloudio/uni-app";
import { saveAvatar } from "@/apis/cos/cos";

let userInfo = ref({
  age: 0,
  avatar: "",
  email: "",
  gender: 0,
  name: "",
  phone: "",
  emergencyContact: "",
  emergencyPhone: ""
});

onLoad(() => {
  getUserInformation();
});

const submit = async () => {
  if (userInfo.value.name.length == 0) {
    await uni.showToast({
      title: "请输入真实姓名",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.name.length > 32) {
    await uni.showToast({
      title: "真实姓名不能超过32个字符",
      icon: "error"
    });
    return;
  }
  if (/\d/.test(userInfo.value.name)) {
    await uni.showToast({
      title: "真实姓名不能含有数字",
      icon: "error"
    });
    return;
  }
  if (!/^((?![\\;!@#$%^&*()]).)*$/.test(userInfo.value.name)) {
    await uni.showToast({
      title: "真实姓名不能含有特殊字符",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.gender == 0) {
    await uni.showToast({
      title: "请选择性别",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.phone.length == 0) {
    await uni.showToast({
      title: "请输入联系电话",
      icon: "error"
    });
    return;
  }
  if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      userInfo.value.phone
    )
  ) {
    await uni.showToast({
      title: "手机号格式错误",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.emergencyPhone.length == 0) {
    await uni.showToast({
      title: "请输入紧急联系人电话",
      icon: "error"
    });
    return;
  }
  if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      userInfo.value.emergencyPhone
    )
  ) {
    await uni.showToast({
      title: "手机号格式错误",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.emergencyContact.length == 0) {
    await uni.showToast({
      title: "请输入紧急联系人",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.emergencyContact.length > 32) {
    await uni.showToast({
      title: "紧急联系人不能超过32个字符",
      icon: "error"
    });
    return;
  }
  if (/\d/.test(userInfo.value.emergencyContact)) {
    await uni.showToast({
      title: "紧急联系人不能含有数字",
      icon: "error"
    });
    return;
  }
  if (!/^((?![\\;!@#$%^&*()]).)*$/.test(userInfo.value.emergencyContact)) {
    await uni.showToast({
      title: "紧急联系人不能含有特殊字符",
      icon: "error"
    });
    return;
  }
  if (userInfo.value.emergencyPhone == userInfo.value.phone) {
    await uni.showToast({
      title: "紧急联系人电话不能与本人电话相同",
      icon: "error"
    });
    return;
  }
  try {
    await updateUserInfoWx({
      age: userInfo.value.age,
      avatar: userInfo.value.avatar,
      emergencyContact: userInfo.value.emergencyContact,
      emergencyPhone: userInfo.value.emergencyPhone,
      gender: userInfo.value.gender,
      nickName: userInfo.value.name,
      phone: userInfo.value.phone,
      email: ""
    });
    const newUserInfo = await getUserInfoWx();
    uni.setStorageSync("UserInfo", newUserInfo);
    await uni.switchTab({
      url: Pages.Index
    });
  } catch (e: any) {
    await uni.showToast({
      title: e.data.message,
      icon: "error"
    });
  }
};

const onChooseAvatar = async (e: any) => {
  const cosUrl: any = await saveAvatar({
    filePath: e.detail.avatarUrl
  });
  userInfo.value.avatar = JSON.parse(cosUrl).message;
};

const handleGenderChange = function (e: any) {
  userInfo.value.gender = parseInt(e.detail.value);
};

function getUserInformation() {
  try {
    const resData = uni.getStorageSync("UserInfo");
    if (resData) {
      userInfo.value = resData;
      if (userInfo.value.avatar === "") {
        userInfo.value.avatar = "/static/default-avatar.png";
      }
    } else {
      uni.showToast({
        title: "用户信息不存在",
        icon: "error"
      });
    }
  } catch (error) {
    uni.showToast({
      title: "获取用户信息失败",
      icon: "error"
    });
  }
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
