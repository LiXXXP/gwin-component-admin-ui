<template>
  <el-select-v2
    class="ad-el-item ad-select-v2"
    :model-value="data.value"
    :class="{ 'is-error': isError }"
    v-bind="{ placeholder: data.label ? '请选择' + data.label : '请选择', ...data }"
    @change="onSelectChange"
  >
  </el-select-v2>
</template>

<script setup lang="ts">
import { ElSelectV2 } from 'element-plus'
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

function onSelectChange(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}
</script>
