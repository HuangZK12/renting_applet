<!-- 置顶搜索栏 -->
<template>
  <view class="search bg-white py-16 px-32">
    <u-input :value="modelValue" @input="$emit('update:modelValue', $event)" prefixIcon="search" v-bind="$attrs"
      @clear="$emit('reset')" :prefixIconStyle="{ 'font-size': '64rpx', 'color': '#e5e5e5', 'margin-left': '20rpx' }"
      :customStyle="{ 'background-color': '#f7f7f7', 'height': '84rpx', 'padding-right': '20rpx' }" border="none"
      confirmType="搜索" placeholder="请输入关键字" clearable shape="circle"></u-input>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.search {
  // margin-bottom: 30rpx;
  position: sticky;
  z-index: 9;
  // top: var(--window-top);
  box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(24, 64, 118, 0.1);
}
</style>