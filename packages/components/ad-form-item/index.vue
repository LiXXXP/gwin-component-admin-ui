<template>
  <div v-show="item.status !== false" class="ad-item" :style="item.style">
    <ad-item-container
      :type="item.labelType"
      :label="item.label"
      :max-label-width="maxLabelWidth"
      :label-style="item.labelStyle"
      :required="item.required || !!item.rules?.find((item) => item === 'require')"
      :tip="item.tip"
    >
      <div class="ad-item__right">
        <div v-if="item.render" class="ad-item__value" v-html="item.render(item)"></div>
        <ad-item v-else ref="itemRef" v-bind="itemProps" :is-error="validateState === 'error'" @blur="onBlur"></ad-item>
        <ad-item-message v-if="validateState === 'error'" class="ad-item__message">{{
          validateMessage
        }}</ad-item-message>
      </div>
    </ad-item-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AdFormItem'
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import { FormItem } from '../interface'
import AdItemContainer from './item-container.vue'
import AdItem from './item.vue'
import AdItemMessage from './item-message.vue'
import { NOOP } from '@vue/shared'
import AsyncValidator from 'async-validator'
import { FormValidateCallback } from 'element-plus'

export interface Props {
  item: FormItem
  size?: string
  maxLabelWidth: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  maxLabelWidth: 20
})

// type AdItemInstance = InstanceType<typeof AdItem>
const itemRef = ref()

// TODO: 设置Item.data的size

const validateState = ref('')
const validateMessage = ref('')

const itemProps = computed(() => {
  const data = Object.assign({ size: props.size, label: props.item.label }, props.item.data)
  return {
    itemKey: props.item.key,
    type: props.item.type,
    data: data,
    isError: validateState.value === 'error'
  }
})

const isRequired = computed(() => {
  const rules = props.item.rules
  let required = props.item.required

  if (rules && rules.length > 0) {
    rules.every((rule) => {
      if (rule.required) {
        required = true
        return false
      }
      return true
    })
  }
  return required
})

defineExpose({
  props,
  validate,
  clearValidateMessage,
  setErrorMessage,
  resetInstanceVariable
})

function onBlur() {
  const { onBlur = NOOP } = props.item.data
  validate('blur')
  onBlur()
}

function validate(trigger = 'blur', callback: FormValidateCallback = NOOP) {
  const { key, status } = props.item
  if (status === false) {
    callback(true)
    return true
  }
  const rules = getFilteredRule(trigger)

  if ((!rules || rules.length === 0) && !isRequired) {
    callback(true)
    return true
  }
  const descriptor: Record<string, any> = {}
  if (rules && rules.length > 0) {
    rules.forEach((rule) => {
      delete rule.trigger
    })
  }
  descriptor[key] = rules
  const validator = new AsyncValidator(descriptor)
  validator._messages.required = props.item.label ? `请填写${props.item.label}` : `请填写${props.item.key}`
  const model: Record<string, any> = {}
  const { value } = props.item.data
  model[key] = value
  validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
    validateState.value = !errors ? 'success' : 'error'
    validateMessage.value = errors
      ? errors[0].message || (props.item.label ? `请填写${props.item.label}` : `请填写${props.item.key}`)
      : ''
    callback(!errors, invalidFields)
  })
}

function getFilteredRule(trigger: string) {
  const rules = getRules()
  if (rules) {
    return rules
      .filter((rule) => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
      .map((rule) => ({ ...rule }))
  } else {
    return []
  }
}

function getRules() {
  const selfRules = props.item.rules || []
  const requiredRule = props.item.required !== undefined ? { required: !!props.item.required } : []
  return selfRules.concat(requiredRule)
}

function setErrorMessage(message: string) {
  if (message && message !== '') {
    validateState.value = 'error'
  }
  validateMessage.value = message
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function clearValidateMessage() {
  validateState.value = 'success'
  setErrorMessage('')
}

function resetInstanceVariable() {
  // 重置内部参数
  if (itemRef.value && itemRef.value.itemRef.resetInstanceVariable) {
    itemRef.value.itemRef.resetInstanceVariable()
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function onChangeStatus(status = props.item.status !== false) {
//   props.item.status = status
// }
</script>
