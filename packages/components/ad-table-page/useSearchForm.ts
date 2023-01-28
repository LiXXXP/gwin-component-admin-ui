import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue-demi'
import { Api, FormConfig } from '../interface'
import useUtils from '../useUtils'
import useForm from './useForm'

export default function useSearchForm(
  searchForm: FormConfig,
  originSearchForm: FormConfig | undefined,
  getPageParams: () => Record<string, any>,
  resetPageParams: () => void,
  apis?: Record<string, Api>
) {
  const searchFormRef = ref()
  const loading = ref(false)
  const { sendApi } = useUtils()
  const searchResult = reactive([])
  const total = ref(0)

  const { getFormValue, resetForm } = useForm()

  function onSearch() {
    searchFormRef.value &&
      searchFormRef.value.validate((valid: boolean) => {
        if (valid) {
          _onSearch()
        }
      })
  }

  async function _onSearch() {
    const searchApi = apis && apis['searchApi']
    if (!searchApi) {
      const str = '请配置搜索接口参数 searchApi'
      ElMessage.error(str)
      console.error(str)
      return
    }
    const targetParams = getTargetSearchData()
    loading.value = true
    const result: any = await sendApi(searchApi, targetParams, false, true).finally(() => {
      loading.value = false
    })
    const target = { data: [], total: 0 }
    target.data = result.dataList || []
    target.total = (result.page && result.page.count) || 0
    searchResult.length = 0
    searchResult.push(...target.data)
    total.value = target.total
  }

  function getTargetSearchData() {
    const params = {
      ...getPageParams(),
      ...getFormValue(searchForm.formItems)
    }
    return params
  }

  function onReset() {
    if (originSearchForm) {
      resetForm(searchForm.formItems, originSearchForm.formItems)
      searchFormRef.value.clearValidatedMessage()
      searchFormRef.value.resetInstanceVariable()
      resetPageParams()
      onSearch()
    }
  }

  return {
    searchFormRef,
    onSearch,
    onReset,
    loading,
    searchResult,
    total,
    getTargetSearchData
  }
}
