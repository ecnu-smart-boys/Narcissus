<template>
  <view />
</template>

<script setup lang="ts">
import { wxLogin } from "@/apis/weixin/auth";
import { loginWx } from "@/apis/auth/auth";
import { Pages } from "@/utils/url";

wxLogin()
  .then((res) => {
    return loginWx({
      code: res.code
    });
  })
  .then((res) => {
    console.log(res);
    if (res === null) {
      uni.navigateTo({
        url: Pages.Register
      });
    } else {
      uni.setStorageSync("userInfo", res);
      uni.switchTab({
        url: Pages.Index,
        success: function () {
          console.log("跳转到含 TabBar 的页面成功");
        },
        fail: function(error) {
          console.log("跳转到含 TabBar 的页面失败", error);
        }
      });
    }
  })
  .catch((err) => {
    console.log(err);
    uni.showToast({
      title: err.toString(),
      icon: "error"
    });
  });
</script>

<style lang="scss" scoped></style>
