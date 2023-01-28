import { FormItem } from '../interface'
import { getCurrentInstance, reactive } from 'vue-demi'
import dayjs from 'dayjs'
import useUtils from '../useUtils'

export default function useForm() {
  const ctx = getCurrentInstance
  const { execStringOrFunction } = useUtils()

  // function getValue(value: any) {
  //   return (value !== undefined && value !== '') || (Array.isArray(value) && value.length) ? value : undefined
  // }

  function getFormValue(formItems?: FormItem[][]) {
    const target: Record<string, any> = {}
    formItems?.forEach((items) => {
      items.forEach((item) => {
        const value = item.data.value
        if (item.status === false || item.isIgnore === true) return
        const itemHandleKey = item.handleKey || item.key
        if (item.handleItemValue) {
          execStringOrFunction(item.handleItemValue, ctx, item.key, undefined, value, target)
        } else if (defaultHandleFormValueFunction[itemHandleKey]) {
          defaultHandleFormValueFunction[itemHandleKey](value, target, item)
        } else {
          target[item.key] = value // getValue(value)
        }
      })
    })
    return target
  }

  function resetForm(formItems?: FormItem[][], originFormItems?: FormItem[][]) {
    if (formItems && originFormItems && formItems.length === originFormItems.length) {
      for (let i = 0; i < formItems.length; i++) {
        const items = formItems[i]
        const originItems = originFormItems[i]
        items.forEach((item) => {
          const target = originItems.find((i) => i.key === item.key)
          item.status = target?.status
          item.data.value = target?.data.value
        })
      }
    }
  }

  const defaultHandleFormValueFunction: Record<string, any> = reactive({
    datetime(value: any, target: any, item: FormItem) {
      if (value) {
        if (Array.isArray(value)) {
          const { handleValue = [] } = item
          const startKey = handleValue[0] || 'startTime'
          const endKey = handleValue[1] || 'endTime'
          target[startKey] = dayjs(value[0]).format('YYYY-MM-DD HH:mm:ss')
          target[endKey] = dayjs(value[1]).format('YYYY-MM-DD HH:mm:ss')
        } else {
          target[item.key] = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    date(value: any, target: any, item: FormItem) {
      if (!value) return
      target[item.key] = dayjs(value).format('YYYY-MM-DD')
    },
    time(value: any, target: any, item: FormItem) {
      if (Array.isArray(value) && value.length) {
        const { handleValue = [] } = item
        const startKey = handleValue[0] || 'startTime'
        const endKey = handleValue[1] || 'endTime'
        target[startKey] = dayjs(value[0]).format('HH:mm:ss')
        target[endKey] = dayjs(value[1]).format('HH:mm:ss')
      } else if (value) {
        target[item.key] = dayjs(value).format('HH:mm:ss')
      }
    }
  })

  return {
    getFormValue,
    resetForm
  }
}
