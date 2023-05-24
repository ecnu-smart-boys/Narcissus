<template>
  <view>
    <view class="submit">
      <view class="submit-chat">
        <view class="bt-img" @tap="records">
          <image :src="toc"></image>
        </view>
        <textarea
          :class="{ displaynone: isrecord }"
          auto-height="true"
          class="chat-send btn"
        ></textarea>
        <view :class="{ displaynone: !isrecord }" class="record btn"
          >按住说话
        </view>
        <view class="bt-img" @tap="emoji">
          <image
            src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/d44f56f7-9403-4ae9-beee-0ffe8321c964.png"
          ></image>
        </view>
        <view class="bt-img">
          <image
            src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/feea3a4b-1220-4953-a11b-b40a0c28e8b0.png"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let isrecord = ref(false);
let toc = ref(
  "https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
);

function records() {
  if (isrecord.value) {
    isrecord.value = false;
    toc.value =
      "https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png";
  } else {
    isrecord.value = true;
    toc.value =
      "https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/a149d455-4614-444b-beb7-76da9648b12e.png";
  }
}
</script>

<style lang="scss" scoped>
.submit {
  background: rgba(244, 244, 244, 0.96);
  width: 100%;
  border-top: 1px solid white;
  position: fixed;
  bottom: 0;
  z-index: 100;
  padding-bottom: 10rpx;
}

.submit-chat {
  width: 100%;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 14rpx 14rpx;

  .bt-img {
    image {
      width: 56rpx;
      height: 56rpx;
      margin: 0 10rpx;
      flex: auto;
    }
  }

  .btn {
    flex: auto;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    max-height: 160rpx;
    margin: 0 10rpx;
  }

  .record {
    text-align: center;
    font-size: 28rpx;
    color: rgba(39, 40, 50, 0.6);
  }

  .displaynone {
    display: none;
  }
}
</style>
