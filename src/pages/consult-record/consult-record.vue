<template>
  <template v-for="item of dummy" :key="item.id">
    <consult-record
      :avatar="item.avatar"
      :consultant-name="item.consultantName"
      :start-time="item.startTime"
      :end-time="item.endTime"
      :score="item.score"
    />
  </template>
  <view v-if="dummy.length === 0" class="no-info-wrapper">
    <img src="/static/message.png" class="icon-no-info" />
    <view>暂无咨询内容</view>
  </view>
</template>

<script setup lang="ts">
import ConsultRecord from "@/components/consult-record.vue";
import { getConsultations } from "@/apis/auth/auth";
import { ConsultationsInfo } from "@/apis/auth/auth-interface";
const dummy = [
  {
    avatar: "/static/default-avatar.png",
    consultantName: "咨询师",
    startTime: "11:15",
    endTime: "12:01",
    score: 3,
    id: 1
  },
  {
    avatar: "/static/default-avatar.png",
    consultantName: "咨询师",
    startTime: "11:11",
    endTime: "12:02",
    score: 4,
    id: 2
  },
  {
    avatar: "/static/default-avatar.png",
    consultantName: "咨询师",
    startTime: "11:23",
    endTime: "12:03",
    score: 5,
    id: 3
  }
];
let consultations: ConsultationsInfo[] = [
  {
    avatar: "",
    consultantName: "",
    endTime: "",
    score: 0,
    startTime: "",
    state: 0,
    id: 0
  }
];
getConsultationsInfo();
function getConsultationsInfo() {
  try {
    getConsultations().then((res) => {
      console.log(res);
      let cnt = 0;
      for (let item of res) {
        console.log(item);
        consultations.push({
          avatar: item.avatar,
          consultantName: item.consultantName,
          endTime: formatTimestamp(item.endTime),
          score: item.score,
          startTime: formatTimestamp(item.startTime),
          state: item.state,
          id: cnt
        });
        cnt++;
      }
    });
  } catch (error) {
    console.error("获取咨询师信息失败:", error);
    return null;
  }
}
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function addLeadingZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
</script>

<style lang="scss" scoped>
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
