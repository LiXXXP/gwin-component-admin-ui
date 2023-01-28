<template>
  <el-time-select
    :model-value="data.value"
    class="ad-el-item ad-time-select"
    :class="{ 'is-error': isError }"
    v-bind="{
      placeholder: data.label ? '请选择' + data.label : '请选择',
      ...data
    }"
    @blur="$emit('blur')"
    @change="onChange"
  ></el-time-select>
</template>

<script setup lang="ts">
import { ElTimeSelect } from 'element-plus'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onChange(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}
</script>
