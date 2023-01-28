<template>
  <el-radio-group
    class="ad-el-item ad-radio-group"
    :model-value="data.value"
    :class="{ 'is-error': isError }"
    v-bind="data"
    @change="onSelectChange"
  >
    <el-radio v-for="item in data.options" :key="item.label" :disabled="item.disabled" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio } from 'element-plus'
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
