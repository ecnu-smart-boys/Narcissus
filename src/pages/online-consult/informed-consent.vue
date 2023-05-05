<template>
  <view class="consent-title">知情者同意书</view>
  <scroll-view scroll-y="true" class="consent-content">
    <view>
      _events: [Object: null prototype] { generateBefore: [Function (anonymous)]
      }, _eventsCount: 1, _maxListeners: undefined, base_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\', public_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\public\\',
      source_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\source\\',
      plugin_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\',
      script_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\scripts\\',
      scaffold_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\scaffolds\\',
      theme_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\hexo-theme-landscape\\',
      theme_script_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\hexo-theme-landscape\\scripts\\',
      env: { args: { _: [Array] }, debug: false, safe: false, silent: false,
      env: 'development', version: '6.3.0', cmd: 's', init: true }, _events:
      [Object: null prototype] { generateBefore: [Function (anonymous)] },
      _eventsCount: 1, _maxListeners: undefined, base_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\', public_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\public\\',
      source_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\source\\',
      plugin_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\',
      script_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\scripts\\',
      scaffold_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\scaffolds\\',
      theme_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\hexo-theme-landscape\\',
      theme_script_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\hexo-theme-landscape\\scripts\\',
      env: { args: { _: [Array] }, debug: false, safe: false, silent: false,
      env: 'development', version: '6.3.0', cmd: 's', init: true }, _events:
      [Object: null prototype] { generateBefore: [Function (anonymous)] },
      _eventsCount: 1, _maxListeners: undefined, base_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\', public_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\public\\',
      source_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\source\\',
      plugin_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\',
      script_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\scripts\\',
      scaffold_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\scaffolds\\',
      theme_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\hexo-theme-landscape\\',
      theme_script_dir:
      'C:\\Users\\Jack\\Desktop\\hexo\\blog6.3.0\\has-.vscode\\node_modules\\hexo-theme-landscape\\scripts\\',
      env: { args: { _: [Array] }, debug: false, safe: false, silent: false,
      env: 'development', version: '6.3.0', cmd: 's', init: true },</view
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
</style>
<style>
page {
  background-color: #f3f3f3;
}
</style>
