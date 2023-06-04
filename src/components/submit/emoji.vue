<template>
  <view class="emoji">
    <view v-for="(line, i) in emoji" :key="i" class="emoji-line">
      <view
        v-for="(item, index) in line"
        :key="index"
        class="emoji-line-item"
        @tap="clickEmoji(item)"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";

const emoji = [
  ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆"],
  ["😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗"]
  // 😙😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫🥱😴😌😛😜😝🤤😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱🥵🥶😳🤪😵🥴😠😡🤬😷🤒🤕🤢🤮🤧😇🥳🥺🤠🤡🤥🤫🤭🧐🤓"
];
const emit = defineEmits(["emotion"]);

function clickEmoji(e: any) {
  emit("emotion", e);
}
</script>
<style lang="scss" scoped></style>
