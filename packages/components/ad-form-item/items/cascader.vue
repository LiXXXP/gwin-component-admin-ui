<template>
  <el-cascader
    :model-value="data.value"
    class="ad-el-item ad-cascader"
    :class="{ 'is-error': isError }"
    :props="{
      multiple: true,
      ...data.props
    }"
    :options="data.options"
    :collapse-tags="data['collapse-tags'] || true"
    :show-all-levels="false"
    v-bind="{ placeholder: data.label ? '请选择' + data.label : '请选择', ...data }"
    @change="onSelectChange"
  >
  </el-cascader>
</template>

<script setup lang="ts">
import { ElCascader } from 'element-plus'
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
