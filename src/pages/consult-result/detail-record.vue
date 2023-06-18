<template>
  <!--  <view class="list-title">-->
  <!--    <view class="title-name">2020/11/24 12:20:09</view>-->
  <!--  </view>-->
  <scroll-view
    class="chat"
    scroll-with-animation="true"
    scroll-y="true"
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
    </view>
  </scroll-view>
  <!--  <label-->
  <!--    v-for="item in record"-->
  <!--    :key="item.id"-->
  <!--    class="uni-list-cell uni-list-cell-pd"-->
  <!--  >-->
  <!--    <view class="card relative">-->
  <!--      <view class="consult-info">-->
  <!--        <view class="consult-info-left">-->
  <!--          <image class="consult-avatar" :src="item.avatar" />-->
  <!--        </view>-->
  <!--        <view class="consult-info-right">-->
  <!--          <view style="display: flex; align-items: center">-->
  <!--            <view class="consult-name">咨询师：{{ item.name }}</view>-->
  <!--            <view class="consult-time">{{ item.time }}</view>-->
  <!--          </view>-->
  <!--          <view class="consult-detail">{{ item.detail }}</view>-->
  <!--        </view>-->
  <!--      </view>-->
  <!--    </view>-->
  <!--  </label>-->
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, onUnmounted, reactive, ref, watchEffect } from "vue";
import tim, { onMessageReceived } from "@/utils/im";
import Share from "@/components/share/share.vue";

let inputh = ref("60");
let msgs = reactive<
  {
    flow: string;
    payload: any;
    types: string;
    time: Date;
  }[]
>([]);
let animationData = ref({});
let nextReqMessageID = ref(0);
let isCompleted = ref(false);
let isloading = ref(true);
let loading = "";
let imgMsg: string[] = [];
let myImg = ref("../../static/default-avatar.png");
let yourImg = ref("../../static/default-avatar.png");
onLoad(() => {
  // getMsg();
  let loginInfo = uni.getStorageSync("LoginInfo");
  console.log(loginInfo);
  myImg.value = loginInfo.avatar;
  console.log(myImg);
  getMsg();
  //console.log(msgs);
  onMessageReceived((data) => {
    msgs.push(...data);
  });
  // nextpageData();
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
  console.log(payload.data);
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

function nextpageData() {
  console.log("jjj");
  isloading.value = false;
  var animation = uni.createAnimation({
    duration: 1000,
    timingFunction: "step-start"
  });

  // animation.scale(2, 2).rotate(45).step();
  //
  // animationData.value = animation.export();
  let i = 1;
  if (!isCompleted.value) {
    console.log("wowowo");
    getMsg1();
  }
  loading = setInterval(
    function () {
      animation.rotate(i * 30).step();
      animationData.value = animation.export();
      i++;
      if (i > 40) {
        isloading.value = true;
      }
    }.bind(this),
    100
  );
  // setTimeout(
  //   function () {
  //     animation.translate(30).step();
  //     animationData.value = animation.export();
  //   }.bind(this),
  //   1000
  // );
}

//获取聊天数据
async function getMsg() {
  let data = await tim.getMessageList({ conversationID: "C2C1255_1" });
  let msg1 = data.data.messageList;
  nextReqMessageID.value = data.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
  isCompleted.value = data.data.isCompleted; // 表示是否已经拉完所有消息。isCompleted 为 true 时，nextReqMessageID 为 ""。
  console.log(msg1);
  for (let i = 0; i < msg1.length; i++) {
    if (msg1[i].type == "TIMImageElem") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      imgMsg.push(msg1[i].payload.imageInfoArray[0].url);
    }
    msgs.push(msg1[i]);
  }
  console.log(msgs);
  clearInterval(loading.valueOf());
  isloading.value = true;
}

async function getMsg1() {
  console.log(isCompleted);
  if (!isCompleted.value) {
    let nextpage = nextReqMessageID.value;
    let data = await tim.getMessageList({
      conversationID: "C2C1255_1",
      nextReqMessageID: nextpage
    });

    let msg1 = data.data.messageList;
    nextReqMessageID.value = data.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
    isCompleted.value = data.data.isCompleted; // 表示是否已经拉完所有消息。isCompleted 为 true 时，nextReqMessageID 为 ""。
    console.log(msg1);
    msgs.unshift(...msg1);
    imgMsg.length = 0;
    for (let i = 0; i < msgs.length; i++) {
      if (msgs[i].type == "TIMImageElem") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        imgMsg.push(msgs[i].payload.imageInfoArray[0].url);
      }
    }
    console.log(msgs);
    clearInterval(loading.value);
    isloading.value = true;
  }
}

function previewImg(e: string) {
  let index = 0;
  for (let i = 0; i < imgMsg.length; i++) {
    if (imgMsg[i] == e) {
      index = i;
      console.log(imgMsg[i]);
    }
  }
  uni.previewImage({
    current: index,
    urls: imgMsg,
    longPressActions: {
      itemList: ["发送给朋友", "保存图片", "收藏"],
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
  //console.log(e);
  innerAudioContext.src = e;
  innerAudioContext.onPlay(() => {
    console.log("开始播放");
  });
  // innerAudioContext.onError((res) => {
  //   console.log(res.errMsg);
  //   console.log(res.errCode);
  // });
}

// let record = reactive<
//   {
//     avatar: string;
//     id: string;
//     time: string;
//     name: string;
//     detail: string;
//   }[]
// >([
//   {
//     avatar: "/static/default-avatar.png",
//     id: "1",
//     time: "2023/05/11 22:56",
//     name: "xxx",
//     detail: "北冥有鱼，其名为鲲。"
//   },
//   {
//     avatar: "/static/default-avatar.png",
//     id: "2",
//     time: "2023/05/12 10:08",
//     name: "yyy",
//     detail: "鲲之大，不知其几千里也。"
//   }
// ]);
</script>

<style lang="scss" scoped>
.displaynone {
  display: none;
}

.chat {
  height: 1500rpx;
  background: #eef2f5;

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
        background-color: rgba(255, 228, 49, 0.8);
        border-radius: 0rpx 20rpx 20rpx 20rpx;
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
  text-decoration: line-through;
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
<!--<style>-->
<!--page {-->
<!--  background-color: #f3f3f3;-->
<!--}-->
<!--</style>-->
