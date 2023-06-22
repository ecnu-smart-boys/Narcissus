<template>
  <view v-if="currentState != 0">
    <view class="head">
      <chat-top
        class="head1"
        :conversation-id="toId"
        :status="currentState"
        :name="name"
        :avatar="avatar"
        :start-time="startTime"
        :should-stop="shouldStop"
        :to-id="toId"
      ></chat-top>
    </view>
    <scroll-view
      class="chat"
      scroll-with-animation="true"
      scroll-y="true"
      :scroll-top="scrollTop"
      @scrolltoupper="nextpageData"
    >
      <view :style="{ paddingBottom: inputh + 'rpx' }" class="chat-main">
        <view :class="{ displaynone: isloading }" class="loading">
          <image
            :animation="animationData"
            class="=loading-img"
            src="https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/18cc645a-8feb-43fb-a131-9f635a69909d.png"
          ></image>
        </view>
        <view v-for="(item, index) in msgs" :key="index" class="chat-ls">
          <view class="chat-time">{{ timestampToTime(item.time * 1000) }}</view>
          <view v-if="item.flow === 'in'">
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
          <view v-if="item.flow === 'out'">
            <view v-if="item.isRevoked" class="revoke2">
              <text>你已撤回一条消息</text>
            </view>
            <view v-else class="msg-m msg-right">
              <image :src="myImg" class="user-img"></image>
              <view
                v-if="item.type === 'TIMTextElem'"
                class="message"
                @longpress="showRevokingModal(index)"
              >
                <view class="msg-text">{{ item.payload.text }}</view>
              </view>
              <view
                v-if="item.type === 'TIMImageElem'"
                class="message"
                @longpress="showRevokingModal(index)"
              >
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
                @longpress="showRevokingModal(index)"
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
              <view
                v-if="item.type === 'TIMCustomElem'"
                class="message"
                @longpress="showRevokingModal(index)"
              >
                <share
                  :payload="item.payload"
                  :conversation-id="conversationId"
                />
              </view>
            </view>
          </view>
        </view>
        <evaluate
          v-if="showEvaluate"
          :conversation-id="conversationId"
          :start-time="startTime"
          :editable="true"
          @on-submit="handleSubmit"
        ></evaluate>
      </view>
    </scroll-view>
    <!--    <van-dialog-->
    <!--      v-model="isRevokingModalShow"-->
    <!--      cancel-button-text="取消"-->
    <!--      confirm-button-text="确定"-->
    <!--      message="确定要撤回这条消息吗？"-->
    <!--      show-cancel-button-->
    <!--      show-confirm-button-->
    <!--      title="提示"-->
    <!--      @confirm="revokeMessage"-->
    <!--    />-->
    <Submit
      v-if="currentState == 1"
      :to-id="toId"
      @audio="audio"
      @heights="heights"
      @inputs="inputs"
      @photo="photo"
    ></Submit>
  </view>
  <view v-if="currentState == 0" class="no-info-wrapper">
    <img src="/static/message.png" class="icon-no-info" />
    <view>暂无在线会话</view>
  </view>
</template>

<script lang="ts" setup>
import { onHide, onLoad, onShow } from "@dcloudio/uni-app";
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watchEffect,
  watch,
  nextTick
} from "vue";
import Submit from "@/components/submit/submit.vue";
import ChatTop from "@/components/chat-top/chat-top.vue";
import tim, { createTextMessage, onMessageReceived } from "@/utils/im";
import Evaluate from "@/components/evaluate/evaluate.vue";
import Share from "@/components/share/share.vue";
import { Message } from "tim-js-sdk";
import {
  conversationState,
  endConsultation
} from "@/apis/conversation/conversation";
import { WebSocketResponse } from "@/apis/schema";

let scrollTop = ref(9999);
let inputh = ref("60");
let msgs = reactive<Message[]>([]);
let animationData = ref({});
let nextReqMessageID = ref("");
let isCompleted = ref(false);
let isloading = ref(true);
let loading: any = null;
let myImg = ref("/static/default-avatar.png");
let yourImg = ref("/static/default-avatar.png");
let shouldStop = ref(false);
// 聊天基本信息
let toId = ref("");
// 1 表示正常聊天页面，2 表示排排队，0 表示会话已结束/没有会话
let currentState = ref(0);
let name = ref("咨询师");
let avatar = ref("/static/default-avatar.png");
let startTime = ref(0);
let conversationId = ref("");
let isEnd = ref(false);

// let isRevokingModalShow = ref(false); // 撤回弹窗是否显示
// let revokeMessageIndex = ref(null); // 需要撤回的消息在消息列表中的索引
let imgMsg: string[] = [];

onLoad(() => {
  const wsTask = uni.connectSocket({
    url:
      "wss://ecnu.xhpolaris.com/api/ws?x-freud=" +
      uni.getStorageSync("accessToken"),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    complete: () => {}
  });
  wsTask.onMessage(async (e) => {
    if (e.data !== "") {
      try {
        const data = JSON.parse(e.data) as WebSocketResponse;
        if (data.type == "start") {
          currentState.value = 1;
        } else if (data.type == "endConsultation") {
          shouldStop.value = true;
          showEvaluate.value = true;
          isEnd.value = true;
          await nextTick(() => {
            scrollTop.value = scrollTop.value + 1;
          });
        }
      } catch (ignored) {
        /* empty */
      }
    }
  });
});

onHide(() => {
  if (isEnd.value) {
    nextReqMessageID.value = "";
    isCompleted.value = false;
    myImg.value = "/static/default-avatar.png";
    yourImg.value = "/static/default-avatar.png";
    avatar.value = "/static/default-avatar.png";
    name.value = "咨询师";
    startTime.value = 0;
    conversationId.value = "";
    showEvaluate.value = false;
    shouldStop.value = false;
  }
  isEnd.value = false;
});

onShow(async () => {
  isEnd.value = false;
  let userInfo = uni.getStorageSync("UserInfo");
  myImg.value = userInfo.avatar;
  const state = await conversationState();
  currentState.value = state.state;
  if (state.state == 1 || state.state == 2) {
    startTime.value = state.startTime;
    toId.value = state.conversation.userId;
    avatar.value =
      state.conversation.avatar == ""
        ? "/static/default-avatar.png"
        : state.conversation.avatar;
    yourImg.value = avatar.value;
    name.value = state.conversation.name;
    conversationId.value = state.conversation.conversationId;
  }
});

const handleSubmit = async () => {
  try {
    await tim.deleteConversation(`C2C${toId.value}`);
  } catch (e) {
    /* empty */
  }
  setTimeout(() => {
    currentState.value = 0;
    nextReqMessageID.value = "";
    isCompleted.value = false;
    myImg.value = "/static/default-avatar.png";
    yourImg.value = "/static/default-avatar.png";
    avatar.value = "/static/default-avatar.png";
    name.value = "咨询师";
    startTime.value = 0;
    conversationId.value = "";
    showEvaluate.value = false;
    shouldStop.value = false;
  }, 500);
};

watch(
  () => currentState,
  async () => {
    if (currentState.value == 1) {
      // 开始IM
      await firstGetMsg();
      // 创立IM监听事件
      onMessageReceived((data) => {
        msgs.push(...data);
        data.forEach((i) => {
          if (i.type == "TIMImageElem") {
            imgMsg.push(i.payload.imageInfoArray[0].url);
          }
        });
        nextTick(() => {
          scrollTop.value = scrollTop.value + 1;
        });
      });
    }
  },
  {
    immediate: true,
    deep: true
  }
);
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

async function handleGlobalEvent(payload: any) {
  if (payload.data === "open") {
    shouldStop.value = true;
    await endConsultation({
      conversationId: conversationId.value
    });
    showEvaluate.value = true;
    await nextTick(() => {
      scrollTop.value = scrollTop.value + 1;
    });
  }
}

function timestampToTime(timestamp: any) {
  timestamp = timestamp ? timestamp : null;
  if (String(timestamp).length < 13) timestamp *= 1000;
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

function nextpageData() {
  isloading.value = false;
  const animation = uni.createAnimation({
    duration: 1000,
    timingFunction: "step-start"
  });
  let i = 1;
  if (!isCompleted.value) {
    getNewMsg();
  }
  loading = setInterval(() => {
    animation.rotate(i * 30).step();
    animationData.value = animation.export();
    i++;
    if (i > 40) {
      isloading.value = true;
    }
  }, 100);
}

// 撤回消息
function revokeMessage(index: any) {
  const message = msgs[index];
  tim
    .revokeMessage(message)
    .then(() => {
      message.isRevoked = true;
      // isRevokingModalShow.value = false;
    })
    .catch(() => {
      uni.showToast({
        title: "撤回失败",
        icon: "error", //将值设置为 success 或者 ''
        duration: 2000 //持续时间为 2秒
      });
    });
}

// 显示撤回弹窗
function showRevokingModal(index: any) {
  //revokeMessageIndex.value = index;
  console.log(msgs[index]);
  // isRevokingModalShow.value = true;
  // console.log(isRevokingModalShow.value);
  uni.showModal({
    title: "提示",
    content: "确认撤回此消息吗",
    success: () => {
      // this.signInFunction(data).then(res=>{
      //   console.log('res',res);
      // })
      revokeMessage(index);
      console.log("hhj");
    }
  });
}

// 首次获取聊天数据
async function firstGetMsg() {
  let data = await tim.getMessageList({ conversationID: `C2C${toId.value}` });
  let msg1 = data.data.messageList;
  msgs.splice(0);
  nextReqMessageID.value = data.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
  isCompleted.value = data.data.isCompleted; // 表示是否已经拉完所有消息。isCompleted 为 true 时，nextReqMessageID 为 ""。
  for (let i = 0; i < msg1.length; i++) {
    if (msg1[i].type == "TIMImageElem") {
      imgMsg.push(msg1[i].payload.imageInfoArray[0].url);
    }
    msgs.push(msg1[i]);
  }
  clearInterval(loading);
  isloading.value = true;
  await nextTick(() => {
    scrollTop.value = scrollTop.value + 1;
  });
}

/// 获取新的聊天数据
async function getNewMsg() {
  if (!isCompleted.value) {
    let data = await tim.getMessageList({
      conversationID: `C2C${toId.value}`,
      nextReqMessageID: nextReqMessageID.value
    });

    let msg1 = data.data.messageList;
    nextReqMessageID.value = data.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
    isCompleted.value = data.data.isCompleted; // 表示是否已经拉完所有消息。isCompleted 为 true 时，nextReqMessageID 为 ""。
    msgs.unshift(...msg1);
    imgMsg.splice(0);
    for (let i = 0; i < msgs.length; i++) {
      if (msgs[i].type == "TIMImageElem") {
        imgMsg.push(msgs[i].payload.imageInfoArray[0].url);
      }
    }
    clearInterval(loading);
    isloading.value = true;
  }
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

async function inputs(e: any) {
  const message = createTextMessage(toId.value, e.msg._value);
  await tim.sendMessage(message);
  msgs.push(message);
  await nextTick(() => {
    scrollTop.value = scrollTop.value + 1;
  });
}

function photo(e: any) {
  msgs.push(e.message);
  nextTick(() => {
    scrollTop.value = scrollTop.value + 1;
  });
}

function audio(e: any) {
  msgs.push(e.message);
  nextTick(() => {
    scrollTop.value = scrollTop.value + 1;
  });
}

function heights(e: string) {
  console.log(e);
}
</script>

<style lang="scss" scoped>
.head1 {
  width: 100%;
  position: fixed; /*固定位置*/
  top: 0;
  z-index: 9999; /*设置优先级显示，保证不会被覆盖*/
}

.displaynone {
  display: none;
}

.chat {
  height: 1000rpx;
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

.no-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .icon-no-info {
    width: 30vw;
    height: 30vw;
  }

  view {
    color: #999999;
  }
}
</style>
