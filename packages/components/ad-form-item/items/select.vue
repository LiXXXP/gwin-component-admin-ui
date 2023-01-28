<template>
  <el-select
    class="ad-el-item ad-select"
    :model-value="data.value"
    :class="{ 'is-error': isError }"
    v-bind="{ placeholder: data.label ? '请选择' + data.label : '请选择', ...data }"
    @change="onSelectChange"
  >
    <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script lang="ts">
export default {
  name: 'AdSelect'
}
</script>
<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
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
