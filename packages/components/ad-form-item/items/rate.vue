<template>
  <el-rate
    :model-value="data.value"
    class="ad-el-item ad-rate"
    :class="{ 'is-error': isError }"
    v-bind="{ ...data }"
    @change="onChange"
  ></el-rate>
</template>

<script setup lang="ts">
import { ElRate } from 'element-plus'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onChange(value: number) {
  formItemOnChange(props.itemKey, value)
}
</script>
