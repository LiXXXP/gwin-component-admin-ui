<template>
  <div class="ad-transfer-wrapper" :class="{ 'is-line': data.line }">
    <el-transfer
      :model-value="data.value"
      class="ad-el-item ad-transfer"
      :class="{ 'is-error': isError }"
      filterable
      :data="data.options ? data.options.map((item: any) => ({ ...item, key: item.value })) : []"
      v-bind="{ 'filter-placeholder': '请输入', ...data }"
      :props="{
        key: 'value',
        label: 'label',
        disabled: 'disabled'
      }"
      @change="onTransferChange"
    >
    </el-transfer>
  </div>
</template>

<script setup lang="ts">
import { ElTransfer } from 'element-plus'
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

function onTransferChange(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}
</script>
