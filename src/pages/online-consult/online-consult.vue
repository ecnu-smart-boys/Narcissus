<template>
  <view>
    <view class="head">
      <chat-top class="head1"></chat-top>
    </view>
    <scroll-view class="chat" scroll-with-animation="true" scroll-y="true">
      <view :style="{ paddingBottom: inputh + 'rpx' }" class="chat-main">
        <view v-for="(item, index) in msgs" :key="index" class="chat-ls">
          <view class="chat-time">{{ item.time }}</view>
          <view v-if="item.id != 'b'" class="msg-m msg-left">
            <image :src="item.imgurl" class="user-img"></image>
            <view v-if="item.types == 0" class="message">
              <view class="msg-text">{{ item.message }}</view>
            </view>
            <view v-if="item.types == 1" class="message">
              <image
                :src="item.message"
                class="msg-img"
                mode="widthFix"
                @tap="previewImg(item.message)"
              ></image>
            </view>
          </view>
          <view v-if="item.id != 'a'" class="msg-m msg-right">
            <image :src="item.imgurl" class="user-img"></image>
            <view v-if="item.types == 0" class="message">
              <view class="msg-text">{{ item.message }}</view>
            </view>
            <view v-if="item.types == 1" class="message">
              <image
                :src="item.message"
                class="msg-img"
                mode="widthFix"
                @tap="previewImg(item.message)"
              ></image>
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
// import { loginIM } from "@/utils/im";
//
// const userID = "your-userid";
// const userSig = "your-usersig";
// const conversationID = "group1";
// const message = ref("");
// const messageList = ref([]);
// // 登录 IM 服务
// onMounted(() => {
//   loginIM(userID, userSig).then(() => {
//     console.log("登录成功");
//   });
// });

// 发送消息
// function sendMessage() {
//   sendMessage(conversationID, message.value).then(() => {
//     console.log("消息发送成功");
//     message.value = "";
//   });
// }

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
    message: string;
    types: number;
    time: Date;
    tip: number;
  }[]
>([]);
let imgMsg: string[] = [];
onLoad(() => {
  getMsg();
  console.log(msgs);
});

//获取聊天数据
function getMsg() {
  let msg = [
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      message: "的手机待机",
      types: 0,
      time: new Date(1626244869999),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      message:
        "那边就不是绝对不接受多年时间倒计时倒计时阶段吧年的世界杯的建设北京的三百",
      types: 0,
      time: new Date(1626244869789),
      tip: 0
    },
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      message:
        "干撒干撒干啥干啥被杀uu时的速度多少都会还是仅仅是当今时代简单觉得你",
      types: 0,
      time: new Date(1626244865437),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      message:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/88116a40-c1bc-42e3-8d7f-1c3e66fd06d8.jpg",
      types: 1,
      time: new Date(1626244868250),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      message:
        "和倒计时倒计时的术后读书的的不俗百度搜不到下班时间对不上不得好死年的世界杯的",
      types: 0,
      time: new Date(1626244866838),
      tip: 1
    },
    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      message:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/2eca5681-d17f-44f3-965c-1ba6e43fb50a.jpg",
      types: 1,
      time: new Date(1626244868250),
      tip: 1
    },
    {
      id: "a",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/a3b7b174-b05b-426c-b492-406cdfa93388.jpg",
      message:
        "的手机待机时间的电脑手机电脑是加拿大电脑上的几年时间你手机电脑手机电脑的难度",
      types: 0,
      time: new Date(1626244868888),
      tip: 1
    },

    {
      id: "b",
      imgurl:
        "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
      message:
        "的失败的话说不定会被北师大版技术大版电脑手机难道就是当年那年暑假绝对加速度难道就是你的就是你的",
      types: 0,
      time: new Date(1626244868250),
      tip: 1
    }
  ];
  for (let i = 0; i < msg.length; i++) {
    if (msg[i].types == 1) {
      imgMsg.unshift(msg[i].message);
    }
    msgs.unshift(msg[i]);
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

function inputs(e: string) {
  let data = {
    id: "b",
    imgurl:
      "https://mp-4dc08b2f-eb0d-40fc-8b5f-e5ab2e09218f.cdn.bspapp.com/cloudstorage/8125c34d-f5cb-448b-b47b-21d72c7044b5.jpg",
    message: e.msg._value,
    types: 0,
    time: new Date(1626244865437),
    tip: 1
  };
  msgs.push(data);
  console.log(e.msg._value);
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
    }
  }
}
</style>
