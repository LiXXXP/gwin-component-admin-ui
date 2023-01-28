<template>
  <div>
    <component
      :is="container"
      :label="label"
      :max-label-width="maxLabelWidth"
      :label-style="labelStyle"
      :required="required"
      :tip="tip"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AdItemContainer'
}
</script>
<script setup lang="ts">
import AdItemNormal from './item-normal.vue'
import AdItemVertical from './item-vertical.vue'
import AdItemAliginRight from './item-aligin-right.vue'
import { computed, StyleValue } from 'vue-demi'
import { LabelType } from '../interface'

export interface Props {
  type?: string
  label?: string
  maxLabelWidth: number
  labelStyle?: StyleValue
  required?: boolean
  tip?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'Normal',
  label: undefined,
  maxLabelWidth: 20,
  labelStyle: undefined,
  required: false,
  tip: ''
})

const container = computed(() => {
  let itemContainer = AdItemNormal
  switch (props.type) {
    case LabelType.NORMAL:
      itemContainer = AdItemNormal
      break
    case LabelType.VERTICAL:
      itemContainer = AdItemVertical
      break
    case LabelType.ALGINRIGHT:
      itemContainer = AdItemAliginRight
      break
    default:
      itemContainer = AdItemNormal
  }
  return itemContainer
})
</script>
