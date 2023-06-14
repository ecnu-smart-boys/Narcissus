<template>
  <view>
    <view class="head">
      <chat-top class="head1"></chat-top>
    </view>
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
              <image
                class="user-img"
                src="https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg"
              ></image>
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
              <view v-if="item.type === 'TIMSoundElem'" class="message">
                <view
                  :style="{ width: item.payload.second * 10 + 'rpx' }"
                  class="msg-text voice"
                >
                  <image
                    class="voice-img"
                    src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
                    @tap="platVoice(item.payload.url)"
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
              <image
                class="user-img"
                src="https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg"
              ></image>
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
              >
                <view
                  :style="{ width: item.payload.second * 10 + 'rpx' }"
                  class="msg-text voice"
                >
                  {{ item.payload.second }}"
                  <image
                    class="voice-img"
                    src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
                    @tap="platVoice(item.payload.url)"
                  ></image>
                </view>
              </view>
            </view>
          </view>
        </view>
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
      @audio="audio"
      @heights="heights"
      @inputs="inputs"
      @photo="photo"
    ></Submit>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import Submit from "@/components/submit/submit.vue";
import ChatTop from "@/components/chat-top/chat-top.vue";
import tim, { createTextMessage, onMessageReceived } from "@/utils/im";

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
// let isRevokingModalShow = ref(false); // 撤回弹窗是否显示
// let revokeMessageIndex = ref(null); // 需要撤回的消息在消息列表中的索引
let imgMsg: string[] = [];
onLoad(() => {
  // getMsg();

  getMsg();
  //console.log(msgs);
  onMessageReceived((data) => {
    msgs.push(...data);
  });
  // nextpageData();
});

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

// 撤回消息
function revokeMessage(index: any) {
  const message = msgs[index];
  tim
    .revokeMessage(message)
    .then(() => {
      message.isRevoking = true;
      // isRevokingModalShow.value = false;
    })
    .catch(() => {
      uni.showToast({
        title: "撤回失败",
        icon: "error", //将值设置为 success 或者 ''
        duration: 2000 //持续时间为 2秒
      });
      console.log("撤回失败");
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
  clearInterval(loading.value);
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

function inputs(e: any) {
  let data = {
    flow: "out",
    payload: {
      text: e.msg._value
    },
    types: "TIMTextElem",
    time: new Date(1626244865437),
    tip: 1
  };
  const message = createTextMessage("1255_1", e.msg._value);
  console.log(message);
  tim.sendMessage(message);
  msgs.push(message);
  console.log(e);
}

function photo(e: any) {
  console.log("我收到图片啦");
  console.log(e.message);
  // let data = {
  //   flow: "out",
  //   payload: {
  //     imageInfoArray: [
  //       {
  //         url: e.res.tempFiles[0].tempFilePath
  //       }
  //     ]
  //   },
  //   types: "TIMImageElem",
  //   time: Date.now()
  // };
  msgs.push(e.message);
}

function audio(e: any) {
  console.log("我收到音频啦");
  console.log(e.message);
  // let data = {
  //   flow: "out",
  //   payload: {
  //     imageInfoArray: [
  //       {
  //         url: e.res.tempFiles[0].tempFilePath
  //       }
  //     ]
  //   },
  //   types: "TIMImageElem",
  //   time: Date.now()
  // };
  msgs.push(e.message);
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
</style>
