<template>
  <view>
    <view class="head">
      <chat-top class="head1"></chat-top>
    </view>
    <scroll-view class="chat" scroll-with-animation="true" scroll-y="true">
      <view :style="{ paddingBottom: inputh + 'rpx' }" class="chat-main">
        <view v-for="(item, index) in msgs" :key="index" class="chat-ls">
          <view class="chat-time">{{ item.time }}</view>
          <view v-if="item.flow === 'in'" class="msg-m msg-left">
            <image :src="item.imgurl" class="user-img"></image>
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
                :style="{ width: item.payload.second * 4 + 'rpx' }"
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
          <view v-if="item.flow === 'out'" class="msg-m msg-right">
            <image :src="item.imgurl" class="user-img"></image>
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
            <view v-if="item.type === 'TIMSoundElem'" class="message">
              <view
                :style="{ width: item.payload.second * 4 + 'rpx' }"
                class="msg-text voice"
              >
                {{ item.payload.second }}"
                <image
                  class="voice-img"
                  src="https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/234a941d-c1d9-474b-9604-5d33eedc144f.png"
                ></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <Submit @heights="heights" @inputs="inputs"></Submit>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import Submit from "@/components/submit/submit.vue";
import ChatTop from "@/components/chat-top/chat-top.vue";
import tim, { createTextMessage } from "@/utils/im";
import TIM from "tim-js-sdk";

// const userSig = "your-usersig";
// const conversationID = "group1";
// const message = ref("");
// const messageList = ref([]);
const onSdkReady = function (event: any) {
  // const message = tim.createTextMessage({
  //   to: "2_1",
  //   conversationType: "C2C",
  //   payload: { text: "Hello world!" }
  // });
  // tim.sendMessage(message);
  getMsg();
};
tim.on(TIM.EVENT.SDK_READY, onSdkReady);
// 监听接收到的消息
// onMessageReceived((list) => {
//   console.log("接收到新消息", list);
//   messageList.value.push(...list);
// });
// default defineComponent({
//   name: "Chat",
//   setup() {
//
//
//
//
//
//
//     return {
//       message,
//       messageList,
//       sendMessage
//     };
//   }
// });
let inputh = ref("60");
let msgs = reactive<
  {
    id: string;
    imgurl: string;
    payload: any;
    types: string;
    time: Date;
    tip: number;
  }[]
>([]);
let imgMsg: string[] = [];
onLoad(() => {
  // getMsg();
  console.log(msgs);
});

//获取聊天数据
async function getMsg() {
  let msg = [
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      payload: { text: "的手机待机" },
      types: "TIMTextElem",
      time: new Date(1626244869999),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      payload: {
        text: "那边就不是绝对不接受多年时间倒计时倒计时阶段吧年的世界杯的建设北京的三百"
      },
      types: "TIMTextElem",
      time: new Date(1626244869789),
      tip: 0
    },
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      payload: {
        text: "干撒干撒干啥干啥被杀uu时的速度多少都会还是仅仅是当今时代简单觉得你"
      },
      types: "TIMTextElem",
      time: new Date(1626244865437),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      payload: {
        imageInfoArray: [
          {
            url: "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/88116a40-c1bc-42e3-8d7f-1c3e66fd06d8.jpg"
          }
        ]
      },
      types: "TIMImageElem",
      time: new Date(1626244868250),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      payload: {
        text: "和倒计时倒计时的术后读书的的不俗百度搜不到下班时间对不上不得好死年的世界杯的"
      },
      types: "TIMTextElem",
      time: new Date(1626244866838),
      tip: 1
    },
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      payload: {
        imageInfoArray: [
          {
            url: "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/2eca5681-d17f-44f3-965c-1ba6e43fb50a.jpg"
          }
        ]
      },
      types: "TIMImageElem",
      time: new Date(1626244868250),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      payload: {
        text: "的手机待机时间的电脑手机电脑是加拿大电脑上的几年时间你手机电脑手机电脑的难度"
      },
      types: "TIMTextElem",
      time: new Date(1626244868888),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      payload: {
        url: "a",
        second: 20
      },
      types: "TIMTextElem",
      time: new Date(1626244868888),
      tip: 1
    },
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      payload: {
        url: "a",
        second: 60
      },
      types: "TIMSoundElem",
      time: new Date(1626244868250),
      tip: 1
    },
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      payload: {
        text: "的失败的话说不定会被北师大版技术大版电脑手机难道就是当年那年暑假绝对加速度难道就是你的就是你的"
      },
      types: "TIMTextElem",
      time: new Date(1626244868250),
      tip: 1
    }
  ];

  let data = await tim.getMessageList({ conversationID: "C2C2_1" });

  let msg1 = data.data.messageList;
  console.log(msg1);
  for (let i = 0; i < msg1.length; i++) {
    if (msg1[i].types == "TIMImageElem") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      imgMsg.push(msg1[i].payload.imageInfoArray[0].url);
    }
    msgs.push(msg1[i]);
    console.log(msgs);
  }
}

function previewImg(e: string) {
  let index = 0;
  for (let i = 0; i < imgMsg.length; i++) {
    if (imgMsg[i] == e) {
      index = i;
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

function inputs(e: any) {
  let data = {
    id: "b",
    imgurl:
      "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
    payload: e.msg._value,
    types: "TIMTextElem",
    time: new Date(1626244865437),
    tip: 1
  };
  const message = createTextMessage("2_1", e.msg._value);
  console.log(message);
  tim.sendMessage(message);
  msgs.push(data);
  console.log(e);
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

.chat {
  height: 100%;
  background: #eef2f5;

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
        min-width: 120rpx;
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
</style>
