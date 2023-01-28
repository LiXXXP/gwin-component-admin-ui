import { onMounted } from 'vue-demi'
import { FormItem, OptionApi } from '../interface'
import useUtils from '../useUtils'

export default function useFormOptions(
  formItems: FormItem[][],
  getOptions: OptionApi[],
  apis: Record<string, OptionApi>
) {
  const { sendApi, getTargetFormItem } = useUtils()

  function getOptionsFromApis() {
    getOptions.forEach(async (item) => {
      const { valueKey = 'id', labelKey = 'name' } = item
      const target = getTargetFormItem(formItems, item.key) // items.find((i) => i.key === item.key)
      try {
        const result = await sendApi(item)
        if (target && target.getOptionsFromApi) {
          target.data.options = result.dataList.map((i: any) => ({ ...i, value: i[valueKey], label: i[labelKey] }))
          target.getOptionsFromApi.result = result.dataList
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  async function getOptionsFromApi(key: string, params = {}) {
    const api = apis[key]
    if (!api) return
    const { valueKey = 'id', labelKey = 'name' } = api
    const target = getTargetFormItem(formItems, key) // items.find((i) => i.key === key)
    try {
      const result = await sendApi(api, params)
      if (target && target.getOptionsFromApi) {
        target.data.options = result.dataList.map((i: any) => ({ ...i, value: i[valueKey], label: i[labelKey] }))
        target.getOptionsFromApi.result = result.dataList
      }
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(() => {
    if (getOptions.length > 0) {
      getOptionsFromApis()
    }
  })

  return {
    getOptionsFromApi
  }
}
