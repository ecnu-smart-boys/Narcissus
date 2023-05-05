<template>
  <view class="stars">
    <image
      class="starsicon"
      :src="starsObject[0]"
      mode="widthFix"
      @click="btnStars(1)"
    ></image>
    <image
      class="starsicon"
      :src="starsObject[1]"
      mode="widthFix"
      @click="btnStars(2)"
    ></image>
    <image
      class="starsicon"
      :src="starsObject[2]"
      mode="widthFix"
      @click="btnStars(3)"
    ></image>
    <image
      class="starsicon"
      :src="starsObject[3]"
      mode="widthFix"
      @click="btnStars(4)"
    ></image>
    <image
      class="starsicon"
      :src="starsObject[4]"
      mode="widthFix"
      @click="btnStars(5)"
    ></image>
  </view>
</template>

<script setup lang="ts">
import { STATIC } from "@/utils/url";
import { reactive } from "vue";

interface IProps {
  starsIndex: number;
  isEditStars: boolean;
}

let starsObject = reactive<string[]>([]);
const props = withDefaults(defineProps<IProps>(), {
  starsIndex: 0,
  isEditStars: false
});
for (let i = 0; i < props.starsIndex; i++) {
  starsObject.push(STATIC.StarSelected);
}
for (let i = 0; i < 5 - props.starsIndex; i++) {
  starsObject.push(STATIC.StarDefault);
}

const btnStars = function (num: number) {
  if (props.isEditStars) {
    starsObject.splice(0);
    for (let i = 0; i < num; i++) {
      starsObject.push(STATIC.StarSelected);
    }
    for (let i = 0; i < 5 - num; i++) {
      starsObject.push(STATIC.StarDefault);
    }
  }
};
</script>

<style scoped lang="scss">
.starsicon {
  width: 56rpx;
  height: 56rpx;
  margin-right: 10rpx;
}

.stars {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
