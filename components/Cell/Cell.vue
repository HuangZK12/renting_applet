<!-- 简单的cell格子，但是很多地方用到 -->
<template>
  <div class="cell_container" :class="{ borderBottom: border }" :style="{'font-size':fontSize+'rpx','padding':`${py}rpx ${px}rpx`}">
    <text class="label">{{ label }}</text>
    <slot name="value">
    <text class="value">{{ value }}</text>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  // 是否有下边框
  border: {
    type: Boolean,
    default: false
  },
  // 字体大小
  fontSize: {
    type: [String,Number],
    default: '36'
  },
  // x轴方向的padding
  px: {
    type: [String,Number],
    default: '30'
  },
  // y轴方向的padding
  py: {
    type: [String,Number],
    default: '42'
  }
})
</script>

<style lang="scss" scoped>
.cell_container {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-family: PingFang SC;
  color: #333333;

  &.borderBottom {
    border-bottom: 1rpx solid #EEEEEE;
  }

  .label {
    font-weight: 500;
    font-size: inherit;
    white-space: nowrap;
    padding-right: 20rpx;
  }

  .value {
    font-weight: 400;
    font-size: inherit;
  }
}
</style>