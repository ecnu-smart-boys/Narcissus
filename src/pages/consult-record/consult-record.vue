<template>
  <template v-for="item of consultations" :key="item.id">
    <consult-record
      :avatar="item.avatar"
      :time="parseTimestamp(item.startTime)"
      :consultant-name="item.consultantName"
      :duration="formatTime(item.endTime - item.startTime)"
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
import { ConsultationsWxResp } from "@/apis/auth/auth-interface";
import { reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { formatTime, parseTimestamp } from "@/utils/time";

let consultations = reactive<ConsultationsWxResp[]>([]);

onLoad(async () => {
  await getConsultationsInfo();
});
async function getConsultationsInfo() {
  const data = await getConsultations();
  data.forEach((i) => {
    if (i.avatar == "") {
      i.avatar = "/static/default-avatar.png";
    }
  });
  consultations.splice(0);
  consultations.push(...data);
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
