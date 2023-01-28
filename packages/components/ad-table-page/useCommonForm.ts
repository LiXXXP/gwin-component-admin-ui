import { NOOP } from '@vue/shared'
import { reactive, ref, getCurrentInstance, nextTick } from 'vue-demi'
import {
  Api,
  ButtonItem,
  ButtonItemOnClickFunc,
  ColumnTSXFunc,
  CommonFormFrom,
  FormConfig,
  InteractionType,
  NoArgVoidFunc
} from '../interface'
import useUtils from '../useUtils'
import useForm from './useForm'
import { ElMessage } from 'element-plus'

export interface CommonForm {
  id?: number
  type?: InteractionType
  fullscreen?: boolean
  from?: string
  label?: string | ColumnTSXFunc
  itemKey?: string | number
  content?: string | ColumnTSXFunc
  apiKey?: string
  row: Record<string, any>
  cancleButton?: ButtonItem
  onCallback: (string | NoArgVoidFunc)[] | NoArgVoidFunc
}

export declare type CommonFormConfig = CommonForm & FormConfig

export default function useCommonForm(
  getTargetSearchData: () => Record<string, any>,
  handleFormConfigs: (formName: string, targetForm: FormConfig) => void,
  onSearch: () => void,
  forms?: Record<string, FormConfig>,
  apis?: Record<string, Api>
) {
  const commonForm: CommonFormConfig = reactive({
    id: undefined,
    type: undefined,
    fullscreen: false,
    from: undefined,
    itemKey: undefined,
    key: '',
    title: undefined,
    content: undefined,
    apiKey: undefined,
    row: {},
    width: '600px',
    cancleButton: undefined,
    actions: [],
    onCallback: NOOP
  })
  const isCommonDialogVisible = ref(false)
  const commonFormRef = ref()
  const { sendApi, execStringOrFunction, isNotStringFunction } = useUtils()
  const { getFormValue, resetForm } = useForm()
  const ctx = getCurrentInstance()

  const callbacks: Record<string, any> = reactive({
    search() {
      onSearch()
    },
    message(params: any, r: ButtonItem) {
      if (r && r.apiKey && r.label) {
        const label = typeof r.label === 'string' ? r.label : r.label(ctx, params)
        ElMessage.success(`${label}成功`)
      } else if (commonForm.label) {
        const label = typeof commonForm.label === 'string' ? commonForm.label : commonForm.label(ctx, params)
        ElMessage.success(`${label}成功`)
      }
    }
  })

  function setCommonData(item: ButtonItem, from: string) {
    if (item.interactionType === InteractionType.API) {
      item.onClick = apiActionOnClick(item, from)
    } else if (item.interactionType === InteractionType.POPUP) {
      item.onClick = popupActionOnClick(item, from)
    } else if (item.interactionType === InteractionType.CONFIRM) {
      item.onClick = confirmActionOnClick(item, from)
    } else if (item.interactionType === InteractionType.SUBMIT) {
      item.onClick = submitActionOnClick(item, from)
    } else if (item.interactionType === InteractionType.CUSTOM) {
      item.onClick = customActionOnClick(item, from)
    }
  }

  function apiActionOnClick(item: ButtonItem, from: string): ButtonItemOnClickFunc {
    return async (data: Record<string, any> = { row: {} }) => {
      commonForm.from = from
      commonForm.label = item.label
      const params = from === CommonFormFrom.ACTIONS ? data.row : getTargetSearchData()
      if (item.beforeAction) {
        const result = execStringOrFunction(item.beforeAction, ctx, params)
        if (!result) return
      }
      if (apis && item.apiKey) {
        try {
          await sendApi(apis[item.apiKey], params)
          execStringOrFunction(item.onCallback, ctx, params, callbacks)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  function popupActionOnClick(item: ButtonItem, from: string): ButtonItemOnClickFunc {
    return async (data: Record<string, any> = { row: {} }) => {
      commonForm.from = from
      commonForm.label = item.label
      if (commonForm.itemKey !== item.key) {
        commonForm.itemKey = item.key
        commonForm.type = InteractionType.POPUP
        item.formKey && handleFormConfigs(item.formKey, commonForm)
        if (item.title) {
          commonForm.title = item.title
        }
        commonForm.apiKey = item.apiKey
        commonForm.onCallback = item.onCallback ? item.onCallback : NOOP
        handleCommonFormActions()
      }
      if (from === CommonFormFrom.ACTIONS) {
        commonForm.id = data.row.id
        commonForm.row = data.row
        if (item.applyRowData !== false) {
          setFormData(data.row)
        }
      }
      try {
        if (apis && item.dataSourceApiKey) {
          const result = await sendApi(apis[item.dataSourceApiKey], data.row, true, true)
          setFormData(result)
        }
      } catch (e) {
        console.log(e)
      }
      isCommonDialogVisible.value = true
      execStringOrFunction(item.onCommonFormShow, ctx, commonForm.formItems, callbacks)
    }
  }

  function confirmActionOnClick(item: ButtonItem, from: string): ButtonItemOnClickFunc {
    return (data: Record<string, any> = { row: {} }) => {
      commonForm.from = from
      commonForm.label = item.label
      commonForm.itemKey = item.key
      commonForm.type = InteractionType.CONFIRM
      commonForm.key = ''
      commonForm.title = item.title
      commonForm.content = item.content
      commonForm.apiKey = item.apiKey
      commonForm.onCallback = item.onCallback ? item.onCallback : NOOP
      commonForm.width = item.modalWidth ? item.modalWidth : '600px'
      commonForm.cancleButton = {
        key: 'cancel',
        label: '取消',
        type: ''
      }
      commonForm.actions = [
        {
          key: 'confirm',
          label: '确定',
          type: 'primary'
        }
      ]
      if (from === CommonFormFrom.ACTIONS) {
        commonForm.id = data.row.id
        commonForm.row = data.row
      }
      isCommonDialogVisible.value = true
      execStringOrFunction(item.onCommonFormShow, ctx, commonForm.formItems, callbacks)
    }
  }

  function submitActionOnClick(item: ButtonItem, from: string): ButtonItemOnClickFunc {
    return () => {
      commonForm.from = from
      commonForm.label = item.label
      commonFormRef.value.validate((valid: boolean) => {
        if (valid) {
          doSubmitAction(item)
        }
      })
    }
  }

  async function doSubmitAction(item: ButtonItem) {
    const params: Record<string, any> = getFormValue(commonForm.formItems)
    params.id = commonForm.id

    if (apis && item.apiKey) {
      try {
        await sendApi(apis[item.apiKey], params, true, true)
        execStringOrFunction(item.onCallback, ctx, params, callbacks)
      } catch (e) {
        console.log(e)
      }
    }
  }

  function customActionOnClick(item: ButtonItem, from: string): ButtonItemOnClickFunc {
    return (data: Record<string, any> = { row: {} }) => {
      commonForm.from = from
      commonForm.label = item.label
      const params = from === CommonFormFrom.ACTIONS ? data.row : getTargetSearchData()
      execStringOrFunction(item.onCallback, ctx, params, callbacks)
    }
  }

  function setFormData(data: Record<string, any>) {
    commonForm.formItems?.forEach((items) => {
      items.forEach((item) => {
        if (item.handleItemSetValue) {
          item.data.value = execStringOrFunction(
            item.handleItemSetValue,
            ctx,
            item.key,
            undefined,
            data[item.key],
            data,
            item
          )
        } else {
          item.data.value = data[item.key]
        }
      })
    })
  }

  function handleCommonFormContent() {
    if (commonForm.content) {
      if (isNotStringFunction(commonForm.content)) {
        return commonForm.content
      } else {
        return execStringOrFunction(commonForm.content, ctx, commonForm.row)
      }
    } else {
      return ''
    }
  }

  function handleCommonFormActions() {
    if (forms) {
      const sourceFormConfig = forms[commonForm.key]
      const targetActions: ButtonItem[] = []
      if (sourceFormConfig && sourceFormConfig.actions && sourceFormConfig.actions.length > 0) {
        sourceFormConfig.actions.forEach((item) => {
          if (typeof item === 'string') {
            if (item === 'cancel') {
              commonForm.cancleButton = {
                key: 'cancel',
                label: '取消',
                type: ''
              }
            } else if (item === 'confirm') {
              targetActions.push({
                key: 'confirm',
                label: '确定',
                type: 'primary'
              })
            }
          } else {
            if (item.key === 'cancel') {
              commonForm.cancleButton = item
            } else {
              targetActions.push(item)
            }
          }
        })
      } else {
        commonForm.cancleButton = undefined
      }
      commonForm.actions = targetActions
    }
  }

  function onOpendCommonDialog() {
    nextTick(() => {
      if (commonFormRef && commonFormRef.value) {
        commonFormRef.value.formInitItemChange()
      }
    })
  }

  function onCanceledCommonDialog() {
    if (commonForm.type === InteractionType.CONFIRM) return
    if (commonForm.key && forms) {
      resetForm(commonForm.formItems, forms[commonForm.key].formItems)
    }
    if (commonFormRef) {
      commonFormRef.value.clearValidatedMessage()
      commonFormRef.value.resetInstanceVariable()
    }
    commonForm.id = undefined
  }

  function onCommonFormCancel() {
    isCommonDialogVisible.value = false
  }

  function onCommonFormSubmit(button: ButtonItem) {
    if (commonForm.type === InteractionType.POPUP) {
      // 表单，需要校验数据
      commonFormRef.value.validate((valid: boolean) => {
        if (valid) {
          _onCommonFormSubmit(button)
        }
      })
    } else if (commonForm.from === CommonFormFrom.ACTIONS) {
      // 行内操作直接调用提交
      _onCommonFormSubmit(button)
    }
  }

  async function _onCommonFormSubmit(button: ButtonItem) {
    let target: Record<string, any> = {}
    if (commonForm.type === InteractionType.POPUP) {
      target = getFormValue(commonForm.formItems)
      target.id = commonForm.id
    } else {
      if (commonForm.from === CommonFormFrom.ACTIONS) {
        target = commonForm.row
      } else {
        target = getTargetSearchData()
      }
    }
    const apiKey = button.apiKey ? button.apiKey : commonForm.apiKey
    if (apis && apiKey) {
      try {
        await sendApi(apis[apiKey], target, true, true)
        isCommonDialogVisible.value = false
        execStringOrFunction(commonForm.onCallback, ctx, target, callbacks, button)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return {
    isCommonDialogVisible,
    commonForm,
    commonFormRef,
    setCommonData,
    onOpendCommonDialog,
    onCanceledCommonDialog,
    onCommonFormCancel,
    onCommonFormSubmit,
    handleCommonFormContent
  }
}
