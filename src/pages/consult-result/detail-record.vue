<template>
  <view class="head">
    <chat-top
      :avatar="yourImg"
      :conversation-id="conversationId"
      :end-time="allDetailsResp?.consultationInfo.lastTime"
      :name="allDetailsResp?.consultationInfo.consultantName"
      :should-stop="true"
      :start-time="allDetailsResp?.consultationInfo.startTime"
      :status="0"
      :to-id="allDetailsResp?.consultationInfo.consultationId ?? ''"
      class="head1"
    ></chat-top>
  </view>
  <scroll-view class="chat" scroll-with-animation="true" scroll-y="true">
    <view :style="{ paddingBottom: inputh + 'rpx' }" class="chat-main">
      <view v-for="(item, index) in allMsg" :key="index" class="chat-ls">
        <view class="chat-time">{{ timestampToTime(item.time) }}</view>
        <view v-if="item.flow === 'out'">
          <view v-if="item.isRevoked" class="revoke2">
            <text>对方已撤回一条消息</text>
          </view>
          <view v-else class="msg-m msg-left">
            <image :src="yourImg" class="user-img"></image>
            <!--                文字-->
            <view v-if="item.type === 'TIMTextElem'" class="message">
              <view class="msg-text">{{ item.payload.text }}</view>
            </view>
            <!--              图片-->
            <view v-if="item.type === 'TIMImageElem'" class="message">
              <image
                :src="item.payload.imageInfoArray[0].url"
                class="msg-img"
                mode="widthFix"
                @tap="previewImg(item.payload.imageInfoArray[0].url)"
              ></image>
            </view>
            <!--              语音-->
            <view
              v-if="item.type === 'TIMSoundElem'"
              class="message"
              @tap="platVoice(item.payload.url)"
            >
              <view
                :style="{ width: item.payload.second * 10 + 'rpx' }"
                class="msg-text voice"
              >
                <image
                  class="voice-img"
                  src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
                ></image>
                {{ item.payload.second }}"
              </view>
            </view>
          </view>
        </view>
        <view v-if="item.flow === 'in'">
          <view v-if="item.isRevoked" class="revoke2">
            <text>你已撤回一条消息</text>
          </view>
          <view v-else class="msg-m msg-right">
            <image :src="myImg" class="user-img"></image>
            <view v-if="item.type === 'TIMTextElem'" class="message">
              <view class="msg-text">{{ item.payload.text }}</view>
            </view>
            <view v-if="item.type === 'TIMImageElem'" class="message">
              <image
                :src="item.payload.imageInfoArray[0].url"
                class="msg-img"
                mode="widthFix"
                @tap="previewImg(item.payload.imageInfoArray[0].url)"
              ></image>
            </view>
            <!--              语音-->
            <view
              v-if="item.type === 'TIMSoundElem'"
              class="message"
              @tap="platVoice(item.payload.url)"
            >
              <view
                :style="{ width: item.payload.second * 10 + 'rpx' }"
                class="msg-text voice"
              >
                {{ item.payload.second }}"
                <image
                  class="voice-img"
                  src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
                ></image>
              </view>
            </view>
            <!--              转发记录-->
            <view v-if="item.type === 'TIMCustomElem'" class="message">
              <share :payload="item.payload"></share>
            </view>
          </view>
        </view>
      </view>
      <evaluate
        :conversation-id="conversationId"
        :editable="false"
        :end-time="allDetailsResp?.consultationInfo.lastTime"
        :start-time="allDetailsResp?.consultationInfo.startTime"
        :score="allDetailsResp?.visitorScore"
      ></evaluate>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, onUnmounted, reactive, ref, watchEffect } from "vue";
import Share from "@/components/share/share.vue";
import { getVisitorConsultationMsg } from "@/apis/conversation/conversation";
import { AllDetailsResp } from "@/apis/conversation/conversation-interface";
import { messageAdapter } from "@/utils/message";
import ChatTop from "@/components/chat-top/chat-top.vue";
import Evaluate from "@/components/evaluate/evaluate.vue";

let inputh = ref("60");
let imgMsg: string[] = [];
let myImg = ref("/static/default-avatar.png");
let yourImg = ref("/static/default-avatar.png");

const allDetailsResp = ref<AllDetailsResp>();
const allMsg = reactive<any[]>([]);
const conversationId = ref("");
onLoad(async (option: any) => {
  console.log(option);
  conversationId.value = option.conversationId;
  let userInfo = uni.getStorageSync("UserInfo");
  myImg.value = userInfo.avatar;
  allDetailsResp.value = await getVisitorConsultationMsg(option.conversationId);
  if (allDetailsResp.value.consultationInfo.consultantAvatar != "") {
    yourImg.value = allDetailsResp.value.consultationInfo.consultantAvatar;
  }
  const data: any[] =
    (allDetailsResp.value?.consultation ?? []).map((i) =>
      messageAdapter(
        i,
        <string>allDetailsResp.value?.consultationInfo.consultantId
      )
    ) ?? [];
  allMsg.splice(0);
  allMsg.push(...data);
  data.forEach((i) => {
    if (i.type == "TIMImageElem") {
      imgMsg.push(i.payload.imageInfoArray[0].url);
    }
  });
});

//显示评分
let showEvaluate = ref(false);
onMounted(() => {
  // 监听全局事件
  watchEffect((onInvalidate) => {
    // 在 watchEffect 内部添加事件监听
    uni.$on("tap-event", handleGlobalEvent);
    // 在组件销毁时取消事件监听
    onUnmounted(() => {
      uni.$off("tap-event", handleGlobalEvent);
    });
    // 在 watchEffect 内部返回一个清理函数，当组件卸载时会自动调用该函数
    onInvalidate(() => {
      uni.$off("tap-event", handleGlobalEvent);
    });
  });
});

function handleGlobalEvent(payload: any) {
  if (payload.data === "open") {
    showEvaluate.value = true;
  }
}

function timestampToTime(timestamp: any) {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

function previewImg(e: string) {
  let index = 0;
  for (let i = 0; i < imgMsg.length; i++) {
    if (imgMsg[i] == e) {
      index = i;
      break;
    }
  }
  uni.previewImage({
    current: index,
    urls: imgMsg,
    longPressActions: {
      itemList: ["保存图片"],
      success: function (data) {
        console.log(
          "选中了第" +
            (data.tapIndex + 1) +
            "个按钮,第" +
            (data.index + 1) +
            "张图片"
        );
      },
      fail: function (err) {
        console.log(err.errMsg);
      }
    }
  });
}

//音频播放
function platVoice(e: string) {
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  innerAudioContext.src = e;
  innerAudioContext.onPlay(() => {
    console.log("开始播放");
  });
}
</script>

<style lang="scss" scoped>
.head1 {
  width: 100%;
  position: fixed; /*固定位置*/
  top: 0;
  z-index: 9999; /*设置优先级显示，保证不会被覆盖*/
}

.chat {
  height: calc(100% - 220rpx);
  background: #eef2f5;
  margin-top: 220rpx;

  .loading {
    text-align: center;

    .loading-img {
      width: 60rpx;
      height: 60rpx;
    }
  }

  .chat-main {
    padding-top: 100rpx;
    padding-right: 32rpx;
    padding-left: 32rpx;
    display: flex;
    flex-direction: column;
  }

  .chat-ls {
    .chat-time {
      font-size: 24rpx;
      color: rgba(39, 40, 50, 0.3);
      line-height: 34rpx;
      padding: 20rpx 0;
      text-align: center;
    }

    .msg-m {
      display: flex;
      padding: 20rpx 0;

      .user-img {
        flex: none;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
      }

      .message {
        flex: none;
        max-width: 480rpx;
      }

      .msg-text {
        font-size: 35rpx;
        line-height: 44rpx;
        padding: 15rpx 24rpx;
      }

      .msg-img {
        max-width: 400rpx;
        border-radius: 20rpx;
      }

      .voice {
        min-width: 70rpx;
        max-width: 400rpx;
      }

      .voice-img {
        width: 28rpx;
        height: 36rpx;
      }
    }

    .msg-left {
      flex-direction: row;

      .msg-text {
        margin-left: 16rpx;
        background-color: #fff;
        border-radius: 0rpx 20rpx 20rpx 20rpx;
      }

      .msg-img {
        margin-left: 16rpx;
      }

      .voice {
        text-align: right;
      }

      .voice-img {
        float: left;
        transform: rotate(180deg);
        width: 28rpx;
        height: 36rpx;
        padding-bottom: 4rpx;
      }
    }

    .msg-right {
      flex-direction: row-reverse;

      .msg-text {
        margin-right: 16rpx;
        background-color: #a6e860;
        border-radius: 20rpx 0rpx 20rpx 20rpx;
      }

      .msg-img {
        margin-right: 16rpx;
      }

      .voice {
        text-align: left;
      }

      .voice-img {
        padding-top: 4rpx;
        float: right;
        width: 28rpx;
        height: 36rpx;
      }
    }
  }
}

.revoke2 {
  color: #999;
  text-align: center;
}

.relative {
  position: relative;
}

.list-title {
  display: flex;
  justify-content: center;
  margin: 20rpx auto;
  font-size: 40rpx;
  font-weight: bold;
}

.card {
  border-radius: 20rpx;
  margin: 40rpx 20rpx;
  display: flex;
  background-color: white;
  box-shadow: 0 0 30px rgba(197, 197, 197, 0.5);
}

.consult-info {
  display: flex;

  .consult-info-left {
    margin: 15rpx 0;

    .consult-avatar {
      border-radius: 50%;
      width: 10vw;
      height: 10vw;
      margin: 30rpx;
    }
  }

  .consult-info-right {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .consult-name {
      font-size: small;
      margin-right: 50rpx;
    }

    .consult-time {
      font-size: small;
      margin-right: 30rpx;
    }

    view {
      margin: 8rpx 0;
      color: grey;
    }
  }
}
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>
