<template>
  <div class="ad-item-normal">
    <p
      v-if="label !== undefined"
      :key="label"
      :data-test="label"
      class="ad-item-label ad-item-normal__label"
      :class="{ 'is-required': required }"
      :style="[{ width: maxLabelWidth + 'px' }, labelStyle ? labelStyle : {}]"
    >
      {{ label }}
      <el-tooltip v-if="tip" popper-class="ad-item-tooltip" :content="tip">
        <el-icon class="ad-item-tip-icon"><InfoFilled /></el-icon>
      </el-tooltip>
    </p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AdItemNormal'
}
</script>
<script setup lang="ts">
import { StyleValue } from 'vue-demi'
import { ElTooltip, ElIcon } from 'element-plus'
export interface Props {
  label?: string
  maxLabelWidth: number
  labelStyle?: StyleValue
  required?: boolean
  tip?: string
}

withDefaults(defineProps<Props>(), {
  label: undefined,
  labelStyle: undefined,
  tip: ''
})
</script>
