import { ValidateError, ValidateFieldsError } from 'async-validator'
import { reactive, getCurrentInstance, onBeforeUpdate } from 'vue-demi'
import { FormItem, Publisher, AdFormItemInstance } from '../interface'
import useUtils from '../useUtils'

export default function useForItem(
  formItems: FormItem[][],
  publishers: Publisher[],
  getOptionsFromApi: (key: string, value: any) => void | any
) {
  let itemRefs: AdFormItemInstance[] = reactive([])
  const ctx = getCurrentInstance()
  // const emit = defineEmits(['onCallback'])
  const { execStringOrFunction, getTargetFormItem, getFormItemsCount } = useUtils()

  const totalItemCount = getFormItemsCount(formItems)

  function setItemRefs(item: any) {
    itemRefs.push(item)
  }

  const actions: Record<string, any> = reactive({
    show(subscriber: AdFormItemInstance) {
      subscriber.props.item.status = true
    },
    hide(subscriber: AdFormItemInstance) {
      subscriber.props.item.status = false
    },
    clear(subscriber: AdFormItemInstance) {
      formItemOnChange(subscriber.props.item.key, undefined)
    },
    async getOptions(subscriber: AdFormItemInstance, value: any) {
      await getOptionsFromApi(subscriber.props.item.key, { id: value })
      formItemOnChange(subscriber.props.item.key, subscriber.props.item.data.value)
    }
  })

  function formInitItemChange() {
    // 出发所有的发布订阅
    if (publishers.length > 0) {
      publishers.forEach((item) => {
        const publisherItem = getTargetFormItem(formItems, item.key as string) // items.find((i) => i.key === item.key)
        const publisherInstance = itemRefs.find((i) => i.props.item.key === item.key) as AdFormItemInstance
        const subscriberInstance = itemRefs.find((i) => i.props.item.key === item.subscriber) as AdFormItemInstance
        handlePulbish(item, publisherItem?.data.value, publisherInstance, subscriberInstance)
      })
    }
  }

  function formItemOnChange(key: string, value: any) {
    // 先赋值
    const item = getTargetFormItem(formItems, key) // items.find((item) => item.key === key)
    if (item) {
      item.data.value = value
    }
    // 后触发发布订阅
    if (publishers.length > 0) {
      publishers.forEach((item) => {
        if (item.key === key) {
          const publisherInstance = itemRefs.find((i) => i.props.item.key === item.key) as AdFormItemInstance
          const subscriberInstance = itemRefs.find((i) => i.props.item.key === item.subscriber) as AdFormItemInstance
          handlePulbish(item, value, publisherInstance, subscriberInstance)
        }
      })
    }
  }

  function handlePulbish(
    publisher: Publisher,
    value: any,
    publisherInstance: AdFormItemInstance,
    subscriberInstance: AdFormItemInstance
  ) {
    if (publisher.match) {
      if (execStringOrFunction(publisher.match, ctx, subscriberInstance, undefined, value, publisherInstance)) {
        execStringOrFunction(publisher.success, ctx, subscriberInstance, actions, value, publisherInstance)
      } else {
        execStringOrFunction(publisher.error, ctx, subscriberInstance, actions, value, publisherInstance)
      }
      execStringOrFunction(publisher.finally, ctx, subscriberInstance, actions, value, publisherInstance)
    } else if (publisher.onCallback) {
      execStringOrFunction(publisher.onCallback, ctx, subscriberInstance, actions, value, publisherInstance)
    }
  }

  function validate(callback: (valid: boolean, inValidItems?: Record<string, ValidateError[]>) => void) {
    if (formItems.length === 0) {
      callback(true)
    }
    let valid = true
    let count = 0
    let inValidItems = {}
    itemRefs.forEach((i) => {
      i.validate('blur', (isValid: boolean, item: ValidateFieldsError) => {
        if (!isValid) {
          valid = false
        }
        inValidItems = Object.assign(inValidItems, item)
        if (++count === totalItemCount) {
          callback(valid, inValidItems)
        }
      })
    })
  }

  function clearValidatedMessage() {
    if (!itemRefs) return
    itemRefs.forEach((item) => {
      item.clearValidateMessage()
    })
  }

  function setErrorMessage(key: string, message: string) {
    const item = itemRefs.find((item) => item.props.item.key === key) || {}
    item.setErrorMessage(message)
  }

  function resetInstanceVariable() {
    if (!itemRefs) return
    itemRefs.forEach((item) => {
      item.resetInstanceVariable()
    })
  }

  onBeforeUpdate(() => {
    itemRefs = []
  })

  return {
    itemRefs,
    setItemRefs,
    formInitItemChange,
    formItemOnChange,
    validate,
    clearValidatedMessage,
    setErrorMessage,
    resetInstanceVariable
  }
}
