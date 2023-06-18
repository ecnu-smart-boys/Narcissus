<template>
  <view class="consent-title">知情者同意书</view>
  <scroll-view scroll-y="true" class="consent-content">
    <view class="text">
      以下是关于心理咨询的一些基本约定，请仔细阅读并在下面签字表明你了解相关规定，并能为自己的行为负责。<br />
      1．为了充分尊重和保护来访者以及咨询师的权益，特拟定本《知情同意书》。<br />
      2．来访者在进入咨询中心之前，有权向有关人员了解咨询中心设置、资源布局等情况，有权对安排给自己的咨询师提出要求（如性别、年龄、阅历、专长等）。<br />
      3．来访者进入咨询中心的求助属自愿行为，咨询过程中应自愿提供尽可能真实的求助信息，对于提供虚假或失真信息者，其咨询结果及其它相应后果由来访者本人负责。<br />
      4．心理咨询中心对来访者在咨询中提供的信息将严格保密。但是如果出现涉及自己或他人生命安全的情况（比如自杀倾向，或者伤害他人的倾向），保密制度将不能保证。<br />
      5．来访者有权利在任何时候中止咨询。<br />
      我已经阅读并理解了上述信息，而且知道我可以询问有关的问题。我同意参加心理咨询。</view
    >
  </scroll-view>
  <button class="submit" :disabled="lastSeconds !== 0" @tap="submit">
    {{ submitInfo }}
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Pages } from "@/utils/url";

let lastSeconds = ref(5);
let submitInfo = computed(() => {
  if (lastSeconds.value !== 0) {
    return `我同意（${lastSeconds.value}S）`;
  }
  return "我同意";
});
const interval = setInterval(() => {
  lastSeconds.value--;
  if (lastSeconds.value === 0) {
    clearInterval(interval);
  }
}, 1000);

const submit = function () {
  uni.navigateTo({
    url: Pages.ConsultList
  });
};
</script>

<style lang="scss" scoped>
.consent-title {
  display: flex;
  justify-content: center;
  margin: 20rpx auto;
  font-size: 40rpx;
  font-weight: bold;
}
.consent-content {
  height: 80vh;
  width: 90vw;
  margin: 30rpx auto;
  background-color: white;
}
.submit {
  background-color: rgb(50, 200, 210);
  color: white;
  font-weight: 700;
  width: 90vw;
  letter-spacing: 3rpx;
  margin: 20rpx auto;
  border-radius: 20rpx;
}
.text {
  font-size: 40rpx;
  line-height: 80rpx;
  padding: 20rpx;
}
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>
