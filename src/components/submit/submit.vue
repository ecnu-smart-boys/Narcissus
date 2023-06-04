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
      <view :class="{ displaynone: !isemoji }" class="emoji">
        <view v-for="(line, i) in emoji1" :key="i" class="emoji-line">
          <view
            v-for="(item, index) in line"
            :key="index"
            class="emoji-line-item"
            @tap="clickEmoji(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from "vue";

const emit = defineEmits(["inputs", "heights"]);
let isrecord = ref(false);
let isemoji = ref(false);
let toc = ref(
  "https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
);
let msg = ref("");
const emoji1 = [
  ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆"],
  ["😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗"],
  ["😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐"],
  ["😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐"],
  ["😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜"],
  ["😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑"],
  ["😲", "🙁", "😖", "😞", "😟", "😤", "😢", "😭"],
  ["😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱"],
  ["🥵", "🥶", "😳", "🤪", "😵", "🥴", "😠", "😡"],
  ["🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇"],
  ["🥳", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐"],
  ["🤓"]
];

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
  // getElementHeight();
}

//文字发送
function inputs(e: { detail: { value: string } }) {
  var chatm = e.detail.value;
  var pos = chatm.indexOf("\n");
  if (pos != -1 && chatm.length > 0) {
    emit("inputs", { msg });
    setTimeout(() => {
      msg.value = "";
    }, 0);
  }
}

function getElementHeight() {
  const query = uni.createSelectorQuery().in(this);
  query
    .select(".submit")
    .boundingClientRect((data) => {
      emit("heights", data.height);
    })
    .exec();
}

function clickEmoji(e: any) {
  console.log(e);
}
</script>

<style lang="scss" scoped>
.submit {
  background: #edf4f9;
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
    max-height: 180rpx;
    margin: 0 10rpx;
  }

  .record {
    text-align: center;
    font-size: 28rpx;
    color: rgba(39, 40, 50, 0.6);
  }
}

.emoji {
  width: 100%;
  height: 460rpx;
  padding: 16rpx 12rpx;
  background: rgba(236, 237, 238, 1);
  box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;

  .emoji-line {
    display: flex;

    .emoji-line-item {
      flex: 1;
      text-align: center;
      font-size: 40rpx;
    }
  }
}
</style>
