<template>
  <el-switch
    :model-value="data.value"
    class="ad-el-item ad-switch"
    :class="{ 'is-error': isError }"
    v-bind="data"
    @change="onSwitchChange"
  >
  </el-switch>
</template>

<script setup lang="ts">
import { ElSwitch } from 'element-plus'
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

function onSwitchChange(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}
</script>
