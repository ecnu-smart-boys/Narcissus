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
      // TODO
    }
  })
  .catch((err) => {
    console.log(err);
    uni.showToast({
      title: err,
      icon: "error"
    });
  });
</script>

<style lang="scss" scoped></style>
