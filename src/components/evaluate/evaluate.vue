<template>
  <view>
    <view class="chat-time">{{ timestampToTime(new Date()) }}</view>
    <view class="card">
      <view class="header">
        <text class="title">本次咨询已结束，请给本次咨询做出评价</text>
      </view>
      <view class="content">
        <view class="row">
          <text class="label">总共用时：</text>
          <text>{{
            endTime
              ? parseTime((endTime - startTime) / 1000)
              : parseTime((new Date().getTime() - startTime) / 1000)
          }}</text>
        </view>
        <view class="row">
          <text class="label">我的评价：</text>
          <view v-for="index in 5" :key="index" class="evaluate">
            <image
              :src="
                (changeable ? star : score + 1) > index
                  ? 'https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/834e737f-0516-4ac7-9ec6-6e38bb245a00.png'
                  : 'https://mp-32c7feb5-a197-4820-b874-2ef762f317e6.cdn.bspapp.com/cloudstorage/19f1ddab-c9d9-4af6-84af-652d3e1e4a3b.png'
              "
              class="img"
              mode="aspectFill"
              @click="changeable ? setStar(index + 1) : null"
            ></image>
          </view>
        </view>
        <view class="row">
          <textarea
            v-model="comment"
            :disabled="!editable"
            class="comment"
            :placeholder="editable ? '请输入评价内容' : ''"
          ></textarea>
        </view>
      </view>
      <view v-if="editable" class="footer">
        <button class="submit" @click="submit">提交评价</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { visitorComment } from "@/apis/auth/auth";
import { parseTime } from "@/utils/time";


const props = defineProps<{
  conversationId: string;
  startTime: number;
  endTime?: number;
  editable: boolean;
  changeable: boolean;
  score: number;
}>();

const emits = defineEmits<{
  (event: "onSubmit"): void;
}>();
let star = ref(1);
let comment = ref("");

function setStar(num: any) {
  star.value = num;
}

let isDisabled = false;
const submit = async () => {
  if (isDisabled) return;
  isDisabled = true;
  await visitorComment({
    conversationId: props.conversationId,
    score: star.value - 1,
    text: comment.value
  });
  emits("onSubmit");
  isDisabled = false;
};

function timestampToTime(timestamp: any) {
  console.log(props);
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
</script>

<style lang="scss" scoped>
.chat-time {
  font-size: 24rpx;
  color: rgba(39, 40, 50, 0.3);
  line-height: 34rpx;
  padding: 20rpx 0;
  text-align: center;
}

.card {
  padding: 20px;
  background-color: #a6e860;
  border-radius: 20rpx;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.content {
  margin-bottom: 20px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 120px;
}

.comment {
  width: 100%;
  height: 80px;
  padding: 30rpx;
  border-radius: 10rpx;
  background-color: white;
}

.footer {
  display: flex;
  justify-content: flex-end;
}

.submit {
  width: 100%;
  height: 120rpx;
  background-color: #368d00;
  color: #fff;
  border-radius: 20rpx;
  padding: 10px 20px;
}

.evaluate {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    width: 43rpx;
    height: 43rpx;
    margin-right: 30rpx;
  }
}
</style>
