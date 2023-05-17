<template>
  <view class="list-title">
    <view class="title-name">2020/11/24 12:20:09</view>
  </view>

  <label v-for="item in record" :key="item.id" class="uni-list-cell uni-list-cell-pd">
    <view class="card relative">
      <view class="consult-info">
        <view class="consult-info-left">
          <image class="consult-avatar" :src="item.avatar" />
        </view>
        <view class="consult-info-right">
          <view style="display: flex; align-items: center">
            <view class="consult-name">咨询师：{{ item.name }}</view>
            <view class="consult-time">{{ item.time }}</view>
          </view>
          <view class="consult-detail">{{ item.detail }}</view>
        </view>
      </view>
    </view>
  </label>
</template>

<script setup lang="ts">
import { reactive } from "vue";
let record = reactive<
  {
    avatar: string;
    id: string;
    time: string;
    name: string;
    detail: string;
  }[]
>([
  {
    avatar: "/static/default-avatar.png",
    id: "1",
    time: "2023/05/11 22:56",
    name: "xxx",
    detail: "北冥有鱼，其名为鲲。"
  },
  {
    avatar: "/static/default-avatar.png",
    id: "2",
    time: "2023/05/12 10:08",
    name: "yyy",
    detail: "鲲之大，不知其几千里也。"
  }
])

</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
.list-title {
  display: flex;
  justify-content: center;
  margin: 20rpx auto;
  font-size: 40rpx;
  font-weight: bold;
}

.card {
  border-radius: 20rpx;
  margin: 40rpx 20rpx;
  display: flex;
  background-color: white;
  box-shadow: 0 0 30px rgba(197, 197, 197, 0.5);
}
.consult-info {
  display: flex;
  .consult-info-left {
    margin: 15rpx 0;
    .consult-avatar {
      border-radius: 50%;
      width: 10vw;
      height: 10vw;
      margin: 30rpx;
    }
  }
  .consult-info-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .consult-name {
      font-size: small;
      margin-right: 50rpx;
    }
    .consult-time {
      font-size: small;
      margin-right: 30rpx;
    }
    view {
      margin: 8rpx 0;
      color: grey;
    }
  }
}
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>