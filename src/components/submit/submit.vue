<template>
  <view>
    <view class="submit">
      <view class="submit-chat">
        <view class="bt-img" @tap="records">
          <image :src="toc"></image>
        </view>
        <textarea
          v-model="msg"
          :class="{ displaynone: isrecord }"
          auto-height="true"
          class="chat-send btn"
          confirm-type="send"
          @input="inputs"
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
      <view :class="{ displaynone: !isemoji }" class="emoji">表情</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let isrecord = ref(false);
let isemoji = ref(false);
let toc = ref(
  "https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
);
let msg = ref("");

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

function emoji() {
  isemoji.value = !isemoji.value;
}

//文字发送
function inputs(e) {
  var chatm = e.detail.value;
  var pos = chatm.indexOf("\n");
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

.displaynone {
  display: none;
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

  .emoji {
    width: 100%;
    height: 460rpx;
    background: rgba(236, 237, 238, 1);
    box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(0, 0, 0, 0.1);
  }
}
</style>
