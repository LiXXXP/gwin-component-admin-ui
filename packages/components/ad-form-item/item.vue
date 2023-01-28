<template>
  <component :is="item" ref="itemRef" v-bind="itemProps" @blur="emit('blur')"></component>
</template>

<script lang="ts">
export default {
  name: 'AdItem'
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import { FormItemType } from '../interface'
import AdInput from './items/input.vue'
import AdInputNumber from './items/input-number.vue'
import AdSelect from './items/select.vue'
import AdSelectV2 from './items/select-v2.vue'
import AdDropDown from './items/drop-down.vue'
import AdDatePicker from './items/date-picker.vue'
import AdTimePicker from './items/time-picker.vue'
import AdTimeSelect from './items/time-select.vue'
import AdRadio from './items/radio.vue'
import AdCheckbox from './items/checkbox.vue'
import AdCascader from './items/cascader.vue'
import AdSwitch from './items/switch.vue'
import AdTransfer from './items/transfer.vue'
import AdSlider from './items/slider.vue'
import AdRate from './items/rate.vue'
import AdRender from './items/render'
import AdUpload from './items/upload.vue'
import AdRichText from './items/rich-text.vue'

export interface Props {
  type?: FormItemType
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: FormItemType.INPUT
})

const emit = defineEmits(['blur'])

const itemProps = computed(() => {
  return {
    itemKey: props.itemKey,
    data: props.data,
    isError: props.isError
  }
})

const itemRef = ref()

const item = computed(() => {
  switch (props.type) {
    case FormItemType.INPUT:
      return AdInput
    case FormItemType.INPUTNUMBER:
      return AdInputNumber
    case FormItemType.SELECT:
      return AdSelect
    case FormItemType.SELECTV2:
      return AdSelectV2
    case FormItemType.DROPDOWN:
      return AdDropDown
    case FormItemType.DATEPICKER:
      return AdDatePicker
    case FormItemType.TIMEPICKER:
      return AdTimePicker
    case FormItemType.TIMESELECT:
      return AdTimeSelect
    case FormItemType.RADIO:
      return AdRadio
    case FormItemType.CHECKBOX:
      return AdCheckbox
    case FormItemType.CASCADER:
      return AdCascader
    case FormItemType.SWITCH:
      return AdSwitch
    case FormItemType.TRANSFER:
      return AdTransfer
    case FormItemType.SLIDER:
      return AdSlider
    case FormItemType.RATE:
      return AdRate
    case FormItemType.RENDER:
      return AdRender
    case FormItemType.UPLOAD:
      return AdUpload
    case FormItemType.RICHTEXT:
      return AdRichText
    default:
      return AdInput
  }
})

defineExpose({
  itemRef
})
</script>
