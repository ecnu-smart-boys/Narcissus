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
          adjust-position="true"
          auto-height="true"
          class="chat-send btn"
          confirm-type="send"
          @confirm="sendMessage"
          @input="inputs"
        ></textarea>
        <view
          :class="{ displaynone: !isrecord }"
          class="record btn"
          @touchend="touchend"
          @touchstart="touchstart"
          >按住说话
        </view>
        <view class="bt-img" @tap="emoji">
          <image
            src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/d44f56f7-9403-4ae9-beee-0ffe8321c964.png"
          ></image>
        </view>
        <view class="bt-img">
          <image
            src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/8aebbae4-c217-431c-8faf-9b0e1f339fdc.png"
            @tap="sendImg('album')"
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
import tim from "@/utils/im";
import TIM from "tim-js-sdk";
// 创建录音管理器实例
let recorderManager = uni.getRecorderManager();
// 定义计时器变量
let timer = ref(null);
// const recorderManager = uni.getRecorderManager();
const emit = defineEmits(["inputs", "heights", "photo", "audio"]);
let isrecord = ref(false);
let isemoji = ref(false);
// let timer = "";
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
  isrecord.value = false;
  toc.value =
    "https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png";
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

function sendMessage() {
  // 在这里调用发送消息的方法，比如：
  // this.$emit('send-message', this.message)
  // 或者：
  // this.$store.dispatch('sendMessage', this.message)

  // 发送完消息后清空输入框
  // msg.value = "";
  emit("inputs", { msg });
  setTimeout(() => {
    msg.value = "";
  }, 0);
}

// function touchstart() {
//   console.log("开始");
//   let i = 0;
//   timer.value = setInterval(() => {
//     i++;
//     console.log(i);
//     if (i > 10) {
//       clearInterval(timer);
//     }
//   }, 1000);
//   recorderManager.start({
//     duration: 6000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
//     sampleRate: 44100, // 采样率
//     numberOfChannels: 1, // 录音通道数
//     encodeBitRate: 192000, // 编码码率
//     format: "aac"
//   });
// }
//
// function touchend() {
//   console.log("结束");
//   clearInterval(timer);
//   recorderManager.stop();
//   recorderManager.onStop(function (res) {
//     console.log("recorder stop" + JSON.stringify(res));
//     //self.voicePath = res.tempFilePath;
//     console.log(res);
//     console.log(timer);
//     sendVoiceMessage(res);
//   });
// }

// function sendVoiceMessage(res: any) {
//   const message = tim.createAudioMessage({
//     to: "1255_1",
//     conversationType: TIM.TYPES.CONV_C2C,
//     payload: {
//       file: {
//         file: res.tempFilePath, // 使用文件路径
//         onProgress: (event: any) => {
//           console.log("上传进度：", event.percent);
//         }
//       }
//     }
//   });
//   console.log(message);
//   // tim.sendMessage(message);
//   tim
//     .sendMessage(message)
//     .then(function (imResponse) {
//       // 发送成功
//       console.log("Send success", imResponse);
//     })
//     .catch(function (imError) {
//       // 发送失败
//       console.warn("Send error", imError);
//     });
// }

// 定义长按开始事件处理函数
function touchstart() {
  console.log("开始");
  let i = 0;
  timer.value = setInterval(() => {
    i++;
    console.log(i);
    if (i > 60) {
      //clearInterval(timer.value);
      touchend();
    }
  }, 1000);
  recorderManager.start({
    duration: 6000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
    sampleRate: 44100, // 采样率
    numberOfChannels: 1, // 录音通道数
    encodeBitRate: 192000, // 编码码率
    format: "aac"
  });
}

// 定义长按结束事件处理函数
function touchend() {
  console.log("结束");
  clearInterval(timer.value);
  recorderManager.stop();
  recorderManager.onStop(function (res: any) {
    console.log("recorder stop" + JSON.stringify(res));
    //self.voicePath = res.tempFilePath;

    console.log(timer.value);
    //sendVoiceMessage(res);
    // const file = {
    //   tempFilePath: res.tempFilePath,
    //   second: timer.value
    // };
    // console.log(file);
    // const message = tim.createAudioMessage({
    //   to: "1255_1",
    //   conversationType: TIM.TYPES.CONV_C2C,
    //   payload: {
    //     // file: {
    //     //   file: res.tempFilePath,
    //     //   onProgress: (event: { percent: any }) => {
    //     //     console.log("上传进度：", event.percent);
    //     //   }
    //     // }
    //     file: res
    //   }
    // });
    // console.log(message);
    sendVoiceMessage(res);
  });
}

// 定义发送语音消息函数
function sendVoiceMessage(res: any) {
  const message = tim.createAudioMessage({
    to: "1255_1",
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      // file: {
      //   file: res.tempFilePath,
      //   onProgress: (event: { percent: any }) => {
      //     console.log("上传进度：", event.percent);
      //   }
      // }
      file: res
    }
  });
  console.log(message);
  tim
    .sendMessage(message)
    .then(function (imResponse) {
      // 发送成功
      console.log("Send success", imResponse);
    })
    .catch(function (imError) {
      // 发送失败
      console.warn("Send error", imError);
    });
  emit("audio", { message });
}

// function getElementHeight() {
//   const query = uni.createSelectorQuery().in(this);
//   query
//     .select(".submit")
//     .boundingClientRect((data) => {
//       emit("heights", data.height);
//     })
//     .exec();
// }

function clickEmoji(e: any) {
  console.log(e);
  msg.value = msg.value + e;
}

function sendImg(e: string) {
  // let count = 1;
  // if (e == "album") {
  //   count = 1;
  // } else {
  //   count = 1;
  // }
  uni.chooseMedia({
    count: 1,
    mediaType: ["image"], // 图片
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], // 从相册选择
    success: function (res) {
      let message = tim.createImageMessage({
        to: "1255_1",
        conversationType: TIM.TYPES.CONV_C2C,
        payload: { file: res },
        onProgress: function (event: any) {
          console.log("file uploading:", event);
        }
      });
      // 2. 发送消息
      let promise = tim.sendMessage(message);
      promise
        .then(function (imResponse) {
          // 发送成功
          console.log("成功" + imResponse);
        })
        .catch(function (imError) {
          // 发送失败
          console.warn("sendMessage error:", imError);
        });
      emit("photo", { message });
    }
  });
  // uni.chooseImage({
  //   count: 1, //默认9
  //   sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
  //   sourceType: [e], //从相册选择
  //   success: function (res) {
  //     console.log(res.tempFiles[0]);
  //     const message = createImageMessage("2_1", res.tempFiles[0]);
  //     console.log(message);
  //     console.log(JSON.stringify(res.tempFilePaths));
  //   }
  // });
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

  .chat-send {
    line-height: 44rpx;
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
