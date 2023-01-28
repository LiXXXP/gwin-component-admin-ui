<template>
  <el-slider
    v-model="sliderValue"
    class="ad-el-item ad-slider"
    :class="{ 'is-error': isError }"
    v-bind="{ ...data, value: undefined }"
    @change="onSliderChange"
  >
  </el-slider>
</template>

<script setup lang="ts">
import { ElSlider } from 'element-plus'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'
import { onMounted, ref } from 'vue'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const sliderValue = ref(0)

const emit = defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onSliderChange(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}

function resetInstanceVariable() {
  sliderValue.value = 0
}

onMounted(() => {
  sliderValue.value = props.data.value
})

defineExpose({
  resetInstanceVariable
})
</script>
