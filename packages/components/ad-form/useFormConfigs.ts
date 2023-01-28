import { FormItem, Publisher, OptionApi } from '../interface'
import { reactive, computed, ref } from 'vue-demi'

export default function useFormConfigs(formItems: FormItem[][]) {
  const publisher: Publisher[] = reactive([])
  const getOptions: OptionApi[] = reactive([])
  const apis: Record<string, OptionApi> = reactive({})

  formItems.forEach((items) => {
    items.forEach((item) => {
      if (item.subscribe) {
        const target = Array.isArray(item.subscribe) ? item.subscribe : [item.subscribe]
        target.forEach((i) => {
          if (typeof i.key === 'string') {
            publisher.push({
              ...i,
              subscriber: item.key
            })
          } else if (Array.isArray(i.key)) {
            i.key.forEach((j) => {
              publisher.push({
                ...i,
                key: j,
                subscriber: item.key
              })
            })
          }
        })
      }
      if (item.publish) {
        const target = Array.isArray(item.publish) ? item.publish : [item.publish]
        target.forEach((i) => {
          if (typeof i.key === 'string') {
            publisher.push({
              ...i,
              key: item.key,
              subscriber: i.key
            })
          } else if (Array.isArray(i.key)) {
            i.key.forEach((j) => {
              publisher.push({
                ...i,
                key: item.key,
                subscriber: j
              })
            })
          }
        })
      }
      if (item.isGetOptionsFromApi && item.getOptionsFromApi) {
        if (item.getOptionsFromApi.isMountedGet) {
          getOptions.push({
            ...item.getOptionsFromApi,
            key: item.key
          })
        }
        apis[item.key] = item.getOptionsFromApi
      }
    })
  })

  const designMaxLabelWidth = ref(0)

  const maxLabelWidth = computed(() => {
    let maxNameLength = 0
    const charWidth = 14
    const requiredIconWidth = 14
    let hasRequiredIcon = false
    const tipIconWidth = 14
    let hasTips = false
    formItems.forEach((items) => {
      items.forEach((item) => {
        if (!item.label) return
        if (item.tip) {
          hasTips = true
        }
        if (item.required || (item.rules && !!item.rules.find((item) => item === 'required'))) {
          hasRequiredIcon = true
        }
        maxNameLength = Math.max(item.label.length, maxNameLength)
      })
    })
    return maxNameLength * charWidth + (hasRequiredIcon ? requiredIconWidth : 0) + (hasTips ? tipIconWidth : 0)
  })

  function handleMaxLabelWidth() {
    let maxNameLength = 0
    const charWidth = 14
    const requiredIconWidth = 14
    let hasRequiredIcon = false
    const tipIconWidth = 14
    let hasTips = false
    formItems.forEach((items) => {
      items.forEach((item) => {
        if (!item.label) return
        if (item.tip) {
          hasTips = true
        }
        if (item.required || (item.rules && !!item.rules.find((item) => item === 'required'))) {
          hasRequiredIcon = true
        }
        maxNameLength = Math.max(item.label.length, maxNameLength)
      })
    })
    return maxNameLength * charWidth + (hasRequiredIcon ? requiredIconWidth : 0) + (hasTips ? tipIconWidth : 0)
  }

  function handleLabelWidth() {
    designMaxLabelWidth.value = handleMaxLabelWidth()
  }

  return {
    publisher,
    getOptions,
    apis,
    maxLabelWidth,
    designMaxLabelWidth,
    handleLabelWidth
  }
}
