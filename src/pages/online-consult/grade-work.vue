<template>
  <view class="container">
    <view class="title">请对本产品进行评分：</view>
    <view>我的评价</view>
    <StarsRating :stars-index="props.score" :is-edit-stars="false" />
    <view class="submit-btn" @click="submitRating">提交评分</view>
  </view>
</template>

<script setup lang="ts">
import StarsRating from "@/components/stars-rating.vue";
import { ref } from "vue";

const selectedStar = ref(0);

const selectStar = (star: number) => {
  selectedStar.value = star;
};

const submitRating = () => {
  console.log("提交评分：", selectedStar.value);
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 18px;
  margin-bottom: 20px;
}

.selected-score {
  font-size: 16px;
  margin-bottom: 20px;
}

.submit-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
