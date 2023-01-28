import { reactive, getCurrentInstance } from 'vue-demi'
import {
  FormConfig,
  FormItem,
  TablePageConfig,
  ButtonItem,
  InteractionType,
  Variable,
  Options,
  Api,
  OptionsFromVariable,
  CommonFormFrom
} from '../interface'
import { ElMessage } from 'element-plus'
import clone from 'clone'
import useUtils from '../useUtils'

export default function useTableConfigs(
  tablePageConfig: TablePageConfig,
  onSearch: () => void,
  onReset: () => void,
  setCommonData: (item: ButtonItem, from: string) => void
) {
  const variables: Record<string, Options[]> = reactive({})
  const searchForm: FormConfig = reactive({ key: '' })
  let resetButton: ButtonItem | undefined
  // let buttonGroup: ButtonItem[] = reactive([])

  const { execStringOrFunction, sendApi } = useUtils()

  type VariablesOptions = OptionsFromVariable & { key: string; type: string }
  const variablesOptions: VariablesOptions[] = reactive([])
  const ctx = getCurrentInstance()

  const searchFormDefaultBtn: Record<string, ButtonItem> = {
    create: {
      key: 'create',
      label: '新增',
      type: 'primary',
      title: '新增',
      interactionType: InteractionType.POPUP,
      apiKey: 'createApi',
      formKey: 'createForm',
      onCallback: ['search', 'message']
    },
    search: {
      key: 'search',
      label: '查询',
      // icon: 'el-icon-search',
      style: {
        color: '#3860f4',
        'border-color': '#3860f4'
      },
      type: '',
      onClick: onSearch
    },
    reset: {
      key: 'reset',
      label: '重置',
      type: 'primary',
      text: true,
      onClick: onReset
    },
    export: {
      key: 'export',
      label: '导出',
      type: 'primary',
      interactionType: InteractionType.API,
      apiKey: 'exportApi',
      onCallback() {
        ElMessage.success('导出成功!')
      }
    }
  }

  handleConfigs()

  function handleConfigs() {
    handleVariables()
    handleFormConfigs('searchForm', searchForm)
    handleSearchFormActions()
  }

  function handleVariables() {
    if (!tablePageConfig.variables) return
    const variableConfig: Record<string, Variable> = tablePageConfig.variables
    const apiConfig: Record<string, Api> | undefined = tablePageConfig.apis
    Object.keys(variableConfig).forEach(async (item) => {
      const variable = variableConfig[item]
      if (variable.apiKey && apiConfig) {
        // 从接口获取变量
        let result = await sendApi(apiConfig[variable.apiKey], {})
        if (variable.handleResult) {
          result = execStringOrFunction(variable.handleResult, ctx, result)
        }
        // variablesOptions.forEach(({ variableKey, type, key, valueKey = 'value', labelKey = 'label' }) => {
        //   if (variableKey === item) {
        //     const options: Record<string, any> = result.map((i: any) => ({ value: i[valueKey], label: i[labelKey] }))
        //     setOptions(type, key, options)
        //   }
        // })
        variables[item] = result
      } else if (variable.value) {
        variables[item] = variable.value
      }
    })
  }

  // function setOptions(type: string, key: string, options: Record<string, any>) {
  //   const item = (ctx && ctx.data.find((item: any) => item.key === key)) || { data: {} }
  //   item.data.options = options
  // }

  function handleFormConfigs(formName: string, targetForm: FormConfig) {
    if (tablePageConfig.forms) {
      const sourceFormConfig = tablePageConfig.forms[formName]
      if (sourceFormConfig) {
        targetForm.key = sourceFormConfig.key
        targetForm.title = sourceFormConfig.title
        targetForm.width = sourceFormConfig.width
        targetForm.fullscreen = sourceFormConfig.fullscreen
        // form items
        targetForm.formItems = []
        if (sourceFormConfig.formItems) {
          const formItems = clone(sourceFormConfig.formItems)
          const data = handleFormGetOptions(formItems, formName)
          data.forEach((items) => {
            const targetItems: FormItem[] = []
            items.forEach((item: any) => {
              targetItems.push(item)
            })
            targetForm.formItems?.push(targetItems)
          })
        }
      } else {
        clearFormConfig(targetForm)
      }
    } else {
      clearFormConfig(targetForm)
    }
  }

  function clearFormConfig(targetForm: FormConfig) {
    targetForm.key = ''
    targetForm.title = undefined
    targetForm.width = '600px'
    targetForm.formItems = []
    targetForm.actions = []
  }

  function handleSearchFormActions() {
    if (tablePageConfig.forms) {
      const sourceFormConfig = tablePageConfig.forms['searchForm']
      const targetActions: ButtonItem[] = []
      if (sourceFormConfig) {
        sourceFormConfig.actions?.forEach((item) => {
          if (typeof item === 'string') {
            if (searchFormDefaultBtn[item]) {
              item = Object.assign(searchFormDefaultBtn[item], {})
              if (item.interactionType) {
                setCommonData(item, CommonFormFrom.BUTTON)
              }
              if (item.key === 'reset') {
                resetButton = item
              } else {
                targetActions.push(item)
              }
            }
          } else {
            if (searchFormDefaultBtn[item.key]) {
              item = Object.assign(searchFormDefaultBtn[item.key], item)
            }
            if (item.interactionType) {
              setCommonData(item, CommonFormFrom.BUTTON)
            }
            if (item.key === 'reset') {
              resetButton = item
            } else {
              targetActions.push(item)
            }
          }
        })
      }
      searchForm.actions = targetActions
    }
  }

  // 只处理配置，不做实际请求
  function handleFormGetOptions(formItems: FormItem[][] = [], key: string) {
    return formItems.map((items) => {
      return items.map((item) => {
        const {
          isGetOptionsFromApi,
          getOptionsFromApi,
          isGetOptionsFromVariable,
          getOptionsFromVariables,
          isGetOptionsFromParent,
          getOptionsFromParent
        } = item
        if (isGetOptionsFromApi && getOptionsFromApi?.apiKey && tablePageConfig.apis) {
          const api = tablePageConfig.apis[getOptionsFromApi.apiKey]
          item.getOptionsFromApi = Object.assign(getOptionsFromApi, api)
        } else if (isGetOptionsFromVariable && getOptionsFromVariables?.variableKey && tablePageConfig.variables) {
          const variable = variables[getOptionsFromVariables.variableKey]
          if (variable) {
            const { valueKey = 'value', labelKey = 'label' } = getOptionsFromVariables
            item.data.options = variable.map((i) => ({ ...i, value: i[valueKey], label: i[labelKey] }))
          } else {
            variablesOptions.push({
              type: key,
              key: item.key,
              ...getOptionsFromVariables
            })
          }
        } else if (isGetOptionsFromParent && getOptionsFromParent?.key) {
          const { valueKey = 'value', labelKey = 'label', isHandle, key } = getOptionsFromParent
          let options: any = ctx?.parent?.data[key]
          if (!options) return
          if (isHandle) {
            options = options.map((i: any) => ({ ...i, value: i[valueKey], label: i[labelKey] }))
          }
          item.data.options = options
        }
        return item
      })
    })
  }

  return {
    searchForm,
    resetButton,
    variables,
    variablesOptions,
    handleConfigs,
    handleFormConfigs
  }
}
