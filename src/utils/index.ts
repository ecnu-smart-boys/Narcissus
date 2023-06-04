import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
// import { logout } from "@/apis/auth/auth";
// import router, { hasRoles } from "@/router";
// import createStore from "@/store/index";
// import { ElNotification } from "element-plus";

const options = {
  SDKAppID: 1400810468
};

const tim = TIM.create(options);

tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release级别，SDK 输出关键信息，生产环境时建议使用

// 注册腾讯云即时通信 IM 上传插件，即时通信 IM SDK 发送图片、语音、视频、文件等消息需要使用上传插件，将文件上传到腾讯云对象存储
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

// 注册腾讯云即时通信 IM 本地审核插件
tim.registerPlugin({ "tim-profanity-filter-plugin": TIMProfanityFilterPlugin });
const TUIOfflinePush = uni.requireNativePlugin("TencentCloud-TUIOfflinePush");
tim.registerPlugin({
  "tim-offline-push-plugin": TUIOfflinePush,
  offlinePushConfig: {
    // huawei
    huaweiBusinessID: "", // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
    // xiaomi
    xiaomiBusinessID: "", // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
    xiaomiAppID: "", // 小米开放平台分配的应用 APPID
    xiaomiAppKey: "", // 小米开放平台分配的应用 APPKEY
    // meizu
    meizuBusinessID: "", // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
    meizuAppID: "", // 魅族开放平台分配的应用 APPID
    meizuAppKey: "", // 魅族开放平台分配的应用 APPKEY
    // vivo
    vivoBusinessID: "", // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
    // oppo
    oppoBusinessID: "", // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
    oppoAppKey: "", // oppo 开放平台分配的应用 APPID
    oppoAppSecret: "", // oppo 开放平台分配的应用 Secret
    // ios
    iosBusinessID: "" // 在腾讯云控制台上传第三方推送证书后分配的证书 ID
  }
});

// SDK 进入 ready 状态时触发，接入侧监听此事件，然后可调用 SDK 发送消息等 API，使用 SDK 的各项功能
const onSdkReady = function (event: any) {
  const message = tim.createTextMessage({
    to: "user1",
    conversationType: "C2C",
    payload: { text: "Hello world!" }
  });
  tim.sendMessage(message);
};
tim.on(TIM.EVENT.SDK_READY, onSdkReady);

// SDK 进入 not ready 状态时触发，此时接入侧将无法使用 SDK 发送消息等功能。如果想恢复使用，接入侧需调用 login 接口，驱动 SDK 进入 ready 状态
const onSdkNotReady = function (event: any) {
  // 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示：
  // tim.login({userID: 'your userID', userSig: 'your userSig'});
};
tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);

// SDK 收到推送的单聊、群聊、群提示、群系统通知的新消息，接入侧可通过遍历 event.data 获取消息列表数据并渲染到页面
const onMessageReceived = function (event: any) {
  // event.data - 存储 Message 对象的数组 - [Message]
};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

// SDK 收到消息被修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容。
const onMessageModified = function (event: any) {
  // event.data - 存储被修改过的 Message 对象的数组 - [Message]
};
tim.on(TIM.EVENT.MESSAGE_MODIFIED, onMessageModified);

// SDK 收到消息被撤回的通知，可通过遍历 event.data 获取被撤回的消息列表数据并渲染到页面，如单聊会话内可展示为 "对方撤回了一条消息"；群聊会话内可展示为 "XXX撤回了一条消息"。
const onMessageRevoked = function (event: any) {
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
};
tim.on(TIM.EVENT.MESSAGE_REVOKED, onMessageRevoked);

// SDK 收到对端已读消息的通知，即已读回执。可通过遍历 event.data 获取对端已读的消息列表数据并渲染到页面，如单聊会话内可将己方发送的消息由“未读”状态改为“已读”。
const onMessageReadByPeer = function (event: any) {
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
};
tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer);

// SDK 收到了群消息的已读回执（v2.18.0起支持）
const onMessageReadReceiptReceived = function (event: { data: any }) {
  // event.data - 存储消息已读回执信息的数组
  const readReceiptInfoList = event.data;
  readReceiptInfoList.forEach(
    (item: {
      groupID: any;
      messageID: any;
      readCount: any;
      unreadCount: any;
    }) => {
      const { groupID, messageID, readCount, unreadCount } = item;
      const message = tim.findMessage(messageID);
      if (message) {
        if (message.readReceiptInfo.unreadCount === 0) {
          // 全部已读
        } else {
          // message.readReceiptInfo.readCount - 消息最新的已读数
          // 如果想要查询哪些群成员已读了此消息，请使用 [getGroupMessageReadMemberList] 接口
        }
      }
    }
  );
};
tim.on(TIM.EVENT.MESSAGE_READ_RECEIPT_RECEIVED, onMessageReadReceiptReceived);

// 会话列表更新，event.data 是包含 Conversation 对象的数组
const onConversationListUpdated = function (event: { data: any }) {
  console.log(event.data); // 包含 Conversation 实例的数组
};
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onConversationListUpdated);

// SDK 群组列表更新时触发，可通过遍历 event.data 获取群组列表数据并渲染到页面
const onGroupListUpdated = function (event: { data: any }) {
  console.log(event.data); // 包含 Group 实例的数组
};
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, onGroupListUpdated);

// 群属性更新时触发，可通过 event.data 获取到更新后的群属性数据（v2.14.0起支持）
const onGroupAttributesUpdated = function (event: {
  data: { groupID: any; groupAttributes: any };
}) {
  const groupID = event.data.groupID; // 群组ID
  const groupAttributes = event.data.groupAttributes; // 更新后的群属性
  console.log(event.data);
};
tim.on(TIM.EVENT.GROUP_ATTRIBUTES_UPDATED, onGroupAttributesUpdated);

// 创建话题时触发（v2.19.1起支持）
const onTopicCreated = function (event: {
  data: { groupID: any; topicID: any };
}) {
  const groupID = event.data.groupID; // 话题所属社群 ID
  const topicID = event.data.topicID; // 话题 ID
  console.log(event.data);
};
tim.on(TIM.EVENT.TOPIC_CREATED, onTopicCreated);

// 删除话题时触发（v2.19.1起支持）
const onTopicDeleted = function (event: {
  data: { groupID: any; topicIDList: any };
}) {
  const groupID = event.data.groupID; // 话题所属社群 ID
  const topicIDList = event.data.topicIDList; // 删除的话题 ID 列表
  console.log(event.data);
};
tim.on(TIM.EVENT.TOPIC_DELETED, onTopicDeleted);

// 话题资料更新时触发（v2.19.1起支持）
const onTopicUpdated = function (event: {
  data: { groupID: any; topic: any };
}) {
  const groupID = event.data.groupID; // 话题所属社群 ID
  const topic = event.data.topic; // 话题资料
  console.log(event.data);
};
tim.on(TIM.EVENT.TOPIC_UPDATED, onTopicUpdated);

// 自己或好友的资料发生变更时触发，event.data 是包含 Profile 对象的数组
const onProfileUpdated = function (event: { data: any }) {
  console.log(event.data); // 包含 Profile 对象的数组
};
tim.on(TIM.EVENT.PROFILE_UPDATED, onProfileUpdated);

// SDK 黑名单列表更新时触发
const onBlacklistUpdated = function (event: { data: any }) {
  console.log(event.data); // 我的黑名单列表，结构为包含用户 userID 的数组
};
tim.on(TIM.EVENT.BLACKLIST_UPDATED, onBlacklistUpdated);

// 好友列表更新时触发
const onFriendListUpdated = function (event: { data: any }) {
  console.log(event.data);
};
tim.on(TIM.EVENT.FRIEND_LIST_UPDATED, onFriendListUpdated);

// 好友分组列表更新时触发
const onFriendGroupListUpdated = function (event: { data: any }) {
  console.log(event.data);
};
tim.on(TIM.EVENT.FRIEND_GROUP_LIST_UPDATED, onFriendGroupListUpdated);

// FRIEND_APPLICATION_LIST_UPDATED
const onFriendApplicationListUpdated = function (event: {
  data: { friendApplicationList: any; unreadCount: any };
}) {
  // friendApplicationList - 好友申请列表 - [FriendApplication]
  // unreadCount - 好友申请的未读数
  const { friendApplicationList, unreadCount } = event.data;
  // 发送给我的好友申请（即别人申请加我为好友）
  const applicationSentToMe = friendApplicationList.filter(
    (friendApplication) =>
      friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_TO_ME
  );
  // 我发送出去的好友申请（即我申请加别人为好友）
  const applicationSentByMe = friendApplicationList.filter(
    (friendApplication) =>
      friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_BY_ME
  );
};
tim.on(
  TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED,
  onFriendApplicationListUpdated
);

// 用户被踢下线时触发
const onKickedOut = function (event: { data: { type: any } }) {
  console.log(event.data.type);
  // TIM.TYPES.KICKED_OUT_MULT_ACCOUNT(Web端，同一帐号，多页面登录被踢)
  // TIM.TYPES.KICKED_OUT_MULT_DEVICE(同一帐号，多端登录被踢)
  // TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED(签名过期)
  // TIM.TYPES.KICKED_OUT_REST_API(REST API kick 接口踢出。v2.20.0起支持)
};
tim.on(TIM.EVENT.KICKED_OUT, onKickedOut);

// 网络状态发生改变
const onNetStateChange = function (event: any) {
  // v2.5.0 起支持
  // event.data.state 当前网络状态，枚举值及说明如下：
  // TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
  // TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
  // TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
};
tim.on(TIM.EVENT.NET_STATE_CHANGE, onNetStateChange);

// 监听事件，如：
// tim.on(TIM.EVENT.SDK_READY, function (event: any) {
//   createStore().setIsTimReady();
// });

// tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event: any) {
//   // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
//   // event.name - TIM.EVENT.MESSAGE_RECEIVED
//   // event.data - 存储 Message 对象的数组 - [Message]
// });

// tim.on(TIM.EVENT.MESSAGE_MODIFIED, function (event: any) {
//   // 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容（v2.12.1起支持）
//   // event.name - TIM.EVENT.MESSAGE_MODIFIED
//   // event.data - 存储被第三方回调修改过的 Message 对象的数组 - [Message]
// });
//
// tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event: any) {
//   // 收到消息被撤回的通知。使用前需要将SDK版本升级至v2.4.0或更高版本
//   // event.name - TIM.EVENT.MESSAGE_REVOKED
//   // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
// });
//
// tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (event: any) {
//   // SDK 收到对端已读消息的通知，即已读回执。使用前需要将SDK版本升级至v2.7.0或更高版本。仅支持单聊会话
//   // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
//   // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
// });
//
// tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event: any) {
//   // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
//   // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
//   // event.data - 存储 Conversation 对象的数组 - [Conversation]
// });
//
// tim.on(TIM.EVENT.ERROR, function (event: any) {
//   ElNotification({
//     title: "Error",
//     message: `IM发生错误\n${event.data.code}\n${event.data.message}`,
//     type: "error"
//   });
// });
//
// tim.on(TIM.EVENT.SDK_NOT_READY, function (event: any) {
//   ElNotification({
//     title: "Error",
//     message: "IM不可用",
//     type: "error"
//   });
// });
//
// tim.on(TIM.EVENT.KICKED_OUT, async (event: any) => {
//   const store = createStore();
//   store.clearUserInfo();
//   store.clearToken();
//   await logout();
//   let errorMsg;
//   if (event.data.type === TIM.TYPES.KICKED_OUT_MULT_ACCOUNT) {
//     errorMsg = "多实例登录被踢";
//   } else if (event.data.type === TIM.TYPES.KICKED_OUT_MULT_DEVICE) {
//     errorMsg = "多终端登录被踢";
//   } else if (event.data.type === TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED) {
//     errorMsg = "签名过期被踢";
//   }
//   ElNotification({
//     title: "Error",
//     message: errorMsg,
//     type: "error"
//   });
//   if (router.hasRoute("supervisor")) {
//     router.removeRoute("supervisor");
//   }
//   if (router.hasRoute("admin")) {
//     router.removeRoute("admin");
//   }
//   if (router.hasRoute("consultant")) {
//     router.removeRoute("consultant");
//   }
//   hasRoles.hasRoles = true;
//   await router.push({ path: "/login" });
// });
//
// tim.on(TIM.EVENT.NET_STATE_CHANGE, (event: any) => {
//   if (event.data.state === TIM.TYPES.NET_STATE_CONNECTING) {
//     ElNotification({
//       title: "Warning",
//       message: "当前网络不稳定",
//       type: "warning"
//     });
//   } else if (event.data.state === TIM.TYPES.NET_STATE_DISCONNECTED) {
//     ElNotification({
//       title: "Error",
//       message: "当前网络不可用",
//       type: "error"
//     });
//   } else if (event.data.state === TIM.TYPES.NET_STATE_CONNECTED) {
//     ElNotification({
//       title: "Success",
//       message: "成功接入IM",
//       type: "success"
//     });
//   }
// });

export default tim;
