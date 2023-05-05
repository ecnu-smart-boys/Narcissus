<template>
  <template v-for="item of dummy" :key="item.id">
    <consult-record
      :duration="item.duration"
      :rate="item.rate"
      :name="item.name"
      :time="item.time"
      :avatar="item.avatar"
    />
  </template>
  <view v-if="dummy.length == 0" class="no-info-wrapper">
    <img src="/static/message.png" class="icon-no-info" />
    <view>暂无咨询内容</view>
  </view>
</template>

<script setup lang="ts">
import ConsultRecord from "@/components/consult-record.vue";
const dummy = [
  {
    time: "100",
    avatar: "/static/default-avatar.png",
    name: "咨询师",
    duration: "1小时",
    rate: 4,
    id: 1
  },
  {
    time: "100",
    avatar: "/static/default-avatar.png",
    name: "咨询师",
    duration: "1小时",
    rate: 4,
    id: 2
  },
  {
    time: "100",
    avatar: "/static/default-avatar.png",
    name: "咨询师",
    duration: "1小时",
    rate: 4,
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
