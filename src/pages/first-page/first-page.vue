<template>
  <view />
</template>

<script lang="ts" setup>
import { wxLogin } from "@/apis/weixin/auth";
import { loginWx } from "@/apis/auth/auth";
import { Pages } from "@/utils/url";
import { genTestUserSig } from "@/debug";
import { loginIM } from "@/utils/im";

const userID = "2_1";
const userSig = genTestUserSig({
  SDKAppID: 1400810468,
  secretKey: "d14df58bc7f5f87424981ca2165867287e2c4ad3ba021709bfdd50edf37daaa0",
  userID: "2_1"
}).userSig;

wxLogin()
  .then((res) => {
    return loginWx({
      code: res.code
    });
  })
  .then((res) => {
    console.log(res);
    uni.setStorageSync("userInfo", res);
    loginIM(userID, userSig).then(() => {
      console.log("登录成功");
    });
    uni.switchTab({
      url: Pages.Index,
      success: function () {
        console.log("跳转到含 TabBar 的页面成功");
      },
      fail: function (error) {
        console.log("跳转到含 TabBar 的页面失败", error);
      }
    });
  })
  .catch((err) => {
    console.log(err);
    if (err.statusCode == 401) {
      uni.navigateTo({
        url: Pages.Register
      });
    } else {
      uni.showToast({
        title: err.toString(),
        icon: "error"
      });
    }
  });
</script>

<style lang="scss" scoped></style>
