<!-- 上传头像 -->
<template>
  <view class="upload_avatar_container">
    <template v-if="modelValue">
      <u-icon size="30" name="close-circle" class="close" @click="handleClose"></u-icon>
      <u--image :src="modelValue" shape="circle" width="124rpx" height="124rpx" @click="handlePreview" />
    </template>
    <u-icon v-else size="40" name="photo-fill" @click="visibility = true" label="点击上传" labelPos="bottom"
      labelSize="12"></u-icon>
  </view>
  <u-popup :show="visibility" :round="20" mode="bottom" class="position-absolute">
    <view class="popup flex flex-col">
      <view class="popup_item" @click="handleUpload('camera')">拍摄</view>
      <view class="popup_item" @click="handleUpload">从相册中选择</view>
      <u-gap height="20" bgColor="#F5F5F5"></u-gap>
      <view class="flex-1 mt-20 popup_item" @click="visibility = false">取消</view>
    </view>
  </u-popup>
</template>

<script setup>
import { ref } from 'vue';
import { chooseImage } from '@/common/utils/uploadFile';
import { imageFormat } from '../../common/utils';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
// 弹窗
const visibility = ref(false)
// 上传
async function handleUpload(sourceType) {
  visibility.value = false
  const { data } = await chooseImage({
    sourceType
  })
  const [{ newFileName }] = data
  emits('update:modelValue', imageFormat(newFileName))
}
// 预览
function handlePreview() {
  uni.previewImage({
    current: 1,
    urls: [props.modelValue]
  });
}
// 删除
function handleClose() {
  uni.showModal({
    title: '提示',
    content: '是否删除当前头像',
    success: function (res) {
      if (res.confirm) {
        emits('update:modelValue', '')
      }
    }
  });
}

</script>

<style lang="scss" scoped>
.upload_avatar_container {
  width: 124rpx;
  height: 124rpx;
  border-radius: 50%;
  background-color: #eee;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}

.popup {
  height: 463rpx;
  padding: 20rpx 0;

  .popup_item {
    font-size: 36rpx;
    font-weight: 400;
    color: #2E2E2E;
    height: 122rpx;
    line-height: 122rpx;
    text-align: center;
    background: #FFFFFF;
    padding: 0 68rpx;

    &:first-of-type {
      border-bottom: 2rpx solid #e5e5e5;
    }
  }
}
</style>