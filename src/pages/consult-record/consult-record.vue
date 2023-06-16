<template>
  <template v-for="item of consultations" :key="item.id">
    <consult-record
      :avatar="item.avatar"
      :consultant-name="item.consultantName"
      :start-time="item.startTime"
      :end-time="item.endTime"
      :score="item.score"
    />
  </template>
  <view v-if="consultations.length === 0" class="no-info-wrapper">
    <img src="/static/message.png" class="icon-no-info" />
    <view>暂无咨询内容</view>
  </view>
</template>

<script setup lang="ts">
import ConsultRecord from "@/components/consult-record.vue";
import { getConsultations } from "@/apis/auth/auth";
import { ConsultationsInfo } from "@/apis/auth/auth-interface";
import { ref } from "vue";

let consultations = ref<ConsultationsInfo[]>([]);

getConsultationsInfo();
function getConsultationsInfo() {
  try {
    getConsultations().then((res) => {
      console.log(res);
      let cnt = 0;
      for (let item of res) {
        let tempAvatar = "";
        if (item.avatar === "") {
          tempAvatar = "/static/default-avatar.png";
        }
        consultations.value.push({
          avatar: tempAvatar,
          consultantName: item.consultantName,
          endTime: formatTimestamp(item.endTime),
          score: item.score,
          startTime: formatTimestamp(item.startTime),
          state: item.state,
          id: cnt
        });
        cnt++;
      }
      console.log(consultations);
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
