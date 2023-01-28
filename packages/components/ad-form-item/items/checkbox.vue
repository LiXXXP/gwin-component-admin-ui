<template>
  <el-checkbox-group
    class="ad-el-item ad-checkbox-group"
    :model-value="data.value"
    :class="{ 'is-error': isError }"
    v-bind="data"
    @change="onSelectChange"
  >
    <el-checkbox v-for="item in data.options" :key="item.label" :disabled="item.disabled || false" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
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
