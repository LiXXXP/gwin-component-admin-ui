<template>
  <el-input-number
    :model-value="data.value"
    class="ad-el-item ad-input-number"
    :class="{ 'is-error': isError }"
    v-bind="{ placeholder: data.label ? '请输入' + data.label : '请输入', ...data }"
    @change="onChange"
  ></el-input-number>
</template>

<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onChange(prev: number | undefined, cur: number | undefined) {
  formItemOnChange(props.itemKey, cur)
}
</script>
