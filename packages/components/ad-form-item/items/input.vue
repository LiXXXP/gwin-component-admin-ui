<template>
  <div :class="{ 'is-line': data.line, 'is-suffix-line': data.suffixLine }">
    <el-input
      :model-value="data.value"
      class="ad-el-item ad-input"
      :class="{ 'is-error': isError }"
      v-bind="{ placeholder: data.label ? '请输入' + data.label : '请输入', ...data }"
      @input="onInput"
      @blur="$emit('blur')"
    ></el-input>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onInput(value: string | number) {
  formItemOnChange(props.itemKey, value)
}
</script>
