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
