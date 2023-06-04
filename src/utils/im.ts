import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

// import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
// const tim = TIM.create({
//   SDKAppID: "1400810468"
// });

const options = {
  SDKAppID: 1400810468
};

const tim = TIM.create(options);

tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release级别，SDK 输出关键信息，生产环境时建议使用

// 注册腾讯云即时通信 IM 上传插件，即时通信 IM SDK 发送图片、语音、视频、文件等消息需要使用上传插件，将文件上传到腾讯云对象存储
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

// 注册腾讯云即时通信 IM 本地审核插件
// tim.registerPlugin({ "tim-profanity-filter-plugin": TIMProfanityFilterPlugin });
const TUIOfflinePush = uni.requireNativePlugin("TencentCloud-TUIOfflinePush");

export function loginIM(userID: string, userSig: string) {
  const promise = tim.login({
    userID,
    userSig
  });

  return promise;
}

// export function sendMessage(conversationID: string, message: string) {
//   const promise = tim
//     .createTextMessage({
//       to: conversationID,
//       conversationType: TIM.TYPES.CONV_GROUP,
//       payload: {
//         text: message
//       }
//     })
//     .then((message: Message) => {
//       return tim.sendMessage(message);
//     });
//
//   return promise;
// }

export function onMessageReceived(callback: (messageList: any[]) => void) {
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, (event: { data: any }) => {
    const messageList = event.data;
    callback(messageList);
  });
}
