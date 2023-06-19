<template>
  <view />
</template>

<script lang="ts" setup>
import { wxLogin } from "@/apis/weixin/auth";
import { getUserInfoWx, loginWx } from "@/apis/auth/auth";
import { Pages } from "@/utils/url";
import { genTestUserSig } from "@/debug";
import { loginIM } from "@/utils/im";
import { onLoad } from "@dcloudio/uni-app";

// TODO userId
const userID = "2_1";
const userSig = genTestUserSig({
  SDKAppID: 1400810468,
  secretKey: "d14df58bc7f5f87424981ca2165867287e2c4ad3ba021709bfdd50edf37daaa0",
  userID: "2_1"
}).userSig;

onLoad(async () => {
  try {
    const wxRes = await wxLogin();
    await loginWx({
      code: wxRes.code
    });
    const userInfo = await getUserInfoWx();
    uni.setStorageSync("UserInfo", userInfo);
    await loginIM(userID, userSig);
    await uni.switchTab({
      url: Pages.Index
    });
  } catch (err: any) {
    if (err.statusCode == 401) {
      await uni.navigateTo({
        url: Pages.Register
      });
    } else {
      await uni.showToast({
        title: err.toString(),
        icon: "error"
      });
    }
  }
});
</script>

<style lang="scss" scoped></style>
