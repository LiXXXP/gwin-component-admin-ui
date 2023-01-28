<template>
  <el-time-picker
    v-model="date"
    class="ad-el-item ad-time-picker"
    :class="{ 'is-error': isError }"
    v-bind="{
      placeholder: data.label ? '请选择' + data.label : '请选择',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间',
      ...temData
    }"
    @blur="$emit('blur')"
    @change="onChange"
  ></el-time-picker>
</template>

<script setup lang="ts">
import { ElTimePicker } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'
import clone from 'clone'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const date = ref()

const temData = computed(() => {
  const target = clone(props.data)
  delete target.value
  return target
})

const emit = defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onChange(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}

function resetInstanceVariable() {
  date.value = ''
}

onMounted(() => {
  date.value = props.data.value
})

defineExpose({
  resetInstanceVariable
})
</script>
