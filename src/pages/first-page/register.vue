<template>
  <view class="register-wrapper">
    <view class="register-weixin-user">
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <img class="avatar" :src="registerReq.avatar" />
      </button>
      <text class="tip-text">请完善个人信息</text>
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">真实姓名</text>
      <input
        v-model="registerReq.name"
        class="register-input"
        placeholder="请输入真实姓名"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">性别</text>
      <radio-group class="register-radio-group" @change="handleGenderChange">
        <label class="radio">
          <radio value="1" color="rgb(50, 200, 210)" />男
        </label>
        <label class="radio">
          <radio value="2" color="rgb(50, 200, 210)" />女
        </label>
      </radio-group>
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">年龄</text>
      <input
        v-model="registerReq.age"
        class="register-input"
        placeholder="请输入年龄"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">联系电话</text>
      <input
        v-model="registerReq.phone"
        class="register-input"
        placeholder="请输入电话"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">验证码</text>
      <view class="register-input">
        <input
          v-model="registerReq.smsCode"
          placeholder="请输入验证码"
          type="text"
          maxlength="20"
        />
        <button class="captcha" @tap="getCaptcha">验证码</button>
      </view>
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">紧急联系人</text>
      <input
        v-model="registerReq.emergencyContact"
        class="register-input"
        placeholder="请输入紧急联系人"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <view class="register-line">
      <text class="register-label">紧急联系人电话</text>
      <input
        v-model="registerReq.emergencyPhone"
        class="register-input"
        placeholder="请输入联系人电话"
        type="text"
        maxlength="20"
      />
    </view>
    <view class="div-line"></view>
    <button class="submit" @tap="submit">提交</button>
  </view>
</template>

<script setup lang="ts">
import { RegisterWxReq } from "@/apis/auth/auth-interface";
import { reactive } from "vue";
import { wxRegister } from "@/apis/weixin/auth";
import { registerWx } from "@/apis/auth/auth";
import { Pages } from "@/utils/url";
import { saveAvatar } from "@/apis/cos/cos";
import { sendSMS } from "@/apis/sms/sms";

const registerReq: RegisterWxReq = reactive({
  age: 0,
  avatar: "/static/default-avatar.png",
  emergencyContact: "",
  emergencyPhone: "",
  gender: 0,
  name: "",
  phone: "",
  smsCode: "",
  smsCodeId: "",
  code: ""
});

const submit = () => {
  if (registerReq.name.length == 0) {
    uni.showToast({
      title: "请输入真实姓名",
      icon: "error"
    });
    return;
  }
  if (registerReq.name.length > 32) {
    uni.showToast({
      title: "真实姓名不能超过32个字符",
      icon: "error"
    });
    return;
  }
  if (/\d/.test(registerReq.name)) {
    uni.showToast({
      title: "真实姓名不能含有数字",
      icon: "error"
    });
    return;
  }
  if (!/^((?![\\;!@#$%^&*()]).)*$/.test(registerReq.name)) {
    uni.showToast({
      title: "真实姓名不能含有特殊字符",
      icon: "error"
    });
    return;
  }
  if (registerReq.gender == 0) {
    uni.showToast({
      title: "请选择性别",
      icon: "error"
    });
    return;
  }
  if (registerReq.phone.length == 0) {
    uni.showToast({
      title: "请输入联系电话",
      icon: "error"
    });
    return;
  }
  if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      registerReq.phone
    )
  ) {
    uni.showToast({
      title: "手机号格式错误",
      icon: "error"
    });
    return;
  }
  if (registerReq.smsCode.length == 0) {
    uni.showToast({
      title: "请输入验证码",
      icon: "error"
    });
    return;
  }
  if (registerReq.emergencyPhone.length == 0) {
    uni.showToast({
      title: "请输入紧急联系人电话",
      icon: "error"
    });
    return;
  }
  if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      registerReq.emergencyPhone
    )
  ) {
    uni.showToast({
      title: "手机号格式错误",
      icon: "error"
    });
    return;
  }
  if (registerReq.emergencyContact.length == 0) {
    uni.showToast({
      title: "请输入紧急联系人",
      icon: "error"
    });
    return;
  }
  if (registerReq.emergencyContact.length > 32) {
    uni.showToast({
      title: "紧急联系人不能超过32个字符",
      icon: "error"
    });
    return;
  }
  if (/\d/.test(registerReq.emergencyContact)) {
    uni.showToast({
      title: "紧急联系人不能含有数字",
      icon: "error"
    });
    return;
  }
  if (!/^((?![\\;!@#$%^&*()]).)*$/.test(registerReq.emergencyContact)) {
    uni.showToast({
      title: "紧急联系人不能含有特殊字符",
      icon: "error"
    });
    return;
  }
  if (registerReq.emergencyPhone == registerReq.phone) {
    uni.showToast({
      title: "紧急联系人电话不能与本人电话相同",
      icon: "error"
    });
    return;
  }
  wxRegister()
    .then((res) => {
      return registerWx({
        age: registerReq.age,
        avatar:
          registerReq.avatar == "/static/default-avatar.png"
            ? ""
            : registerReq.avatar,
        emergencyContact: registerReq.emergencyContact,
        emergencyPhone: registerReq.emergencyPhone,
        gender: registerReq.gender,
        name: registerReq.name,
        phone: registerReq.phone,
        smsCode: registerReq.smsCode,
        smsCodeId: "",
        code: res.code
      });
    })
    .then(() => {
      uni.navigateTo({
        url: Pages.FirstPage
      });
    })
    .catch((err) => {
      uni.showToast({
        title: err.toString(),
        icon: "error"
      });
    });
};

const onChooseAvatar = async (e: any) => {
  const cosUrl: any = await saveAvatar({
    filePath: e.detail.avatarUrl
  });
  registerReq.avatar = JSON.parse(cosUrl).message;
};

const getCaptcha = async () => {
  if (registerReq.phone == "") {
    await uni.showToast({
      title: "手机号不能为空",
      icon: "error"
    });
    return;
  } else if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      registerReq.phone
    )
  ) {
    await uni.showToast({
      title: "手机号格式错误",
      icon: "error"
    });
    return;
  }
  await sendSMS({
    phone: registerReq.phone
  });
  await uni.showToast({
    title: "验证码发送成功",
    icon: "success"
  });
};

const handleGenderChange = (e: any) => {
  registerReq.gender = e.detail.value;
};
</script>

<style lang="scss" scoped>
.register-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 50rpx;
  font-size: small;

  .register-radio-group {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }

  .register-line {
    display: flex;
    justify-content: space-between;
    margin: 30rpx 0;

    .register-input {
      text-align: right;
      display: flex;
    }

    .register-label {
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

.register-weixin-user {
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
.captcha {
  background-color: rgb(50, 200, 210);
  color: white;
  border-radius: 20rpx;
  margin: -15rpx 0;
  font-size: small;
}
</style>
