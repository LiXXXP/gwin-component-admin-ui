import { ref, getCurrentInstance, computed } from 'vue-demi'
import { Api, ButtonItem, ColumnItems, CommonFormFrom, InteractionType, Options, TableConfig } from '../interface'
import useUtils from '../useUtils'
import { useRouter } from 'vue-router'

export default function useTable(
  variables: Record<string, Options[]>,
  onSearch: () => void,
  setCommonData: (item: ButtonItem, from: string) => void,
  apis?: Record<string, Api>,
  tableConfig?: TableConfig
) {
  const table = ref(null)
  const { execStringOrFunction, sendApi, handleApiPath } = useUtils()
  const ctx = getCurrentInstance()
  const router = useRouter()

  const tableActionData = computed(() => {
    const defaultBtn: Record<string, ButtonItem> = {
      delete: {
        key: 'delete',
        type: 'primary',
        text: true,
        label: '删除',
        title: '提示',
        modalWidth: '280px',
        interactionType: InteractionType.CONFIRM,
        content: '确定要删除吗？',
        apiKey: 'deleteApi',
        onCallback: ['search', 'message']
      },
      edit: {
        key: 'edit',
        type: 'primary',
        text: true,
        label: '编辑',
        title: '编辑',
        interactionType: InteractionType.POPUP,
        apiKey: 'updateApi',
        formKey: 'createForm',
        onCallback: ['search', 'message']
      },
      status: {
        key: 'status',
        type: 'primary',
        text: true,
        label: (ctx, row) => (row.status ? '下架' : '上架'),
        onClick: (scope) => updateStatus(scope)
      }
    }

    const target = tableConfig?.actions?.map((item) => {
      if (typeof item === 'string') {
        item = defaultBtn[item]
      } else if (defaultBtn[item.key]) {
        item = Object.assign({}, defaultBtn[item.key], item)
      }
      if (item.interactionType) {
        setCommonData(item, CommonFormFrom.ACTIONS)
      }
      return item
    })
    return target || []
  })

  function getColumnTagsData(value: string[], row: any, column: ColumnItems) {
    if (!value || !Array.isArray(value) || !value.length) return []
    const tagsKey = column.tagsVariables
    if (tagsKey) {
      if (!variables[tagsKey]) return []
      const t = value.map((item) => variables[tagsKey].find((i) => i.value === item)).filter((item) => item)
      return t
    }
    if (!column.tags) return []
    return execStringOrFunction(column.tags, ctx, value, {}, row, column)
  }

  function handleColumnsMap(column: ColumnItems, val: any) {
    const handle = (value: any) => {
      if (value === undefined) return
      const variableMap = column.variableMap
      if (variableMap) {
        const data: Record<string, any> =
          (variables[variableMap.variableKey] || []).find((item) => item[variableMap.valueKey || 'value'] === value) ||
          {}
        return data[variableMap.labelKey || 'label']
      }
      return undefined
    }
    if (Array.isArray(val)) {
      return val.map((item: any) =>
        handle(item)
          .filter((item: any) => item)
          .join('、')
      )
    }
    return handle(val)
  }

  function updateStatus(scope: any) {
    const targetApi = apis && (apis['statusUpdateApi'] || apis['updateApi'])
    if (targetApi) {
      if (typeof scope.row.status === 'boolean') {
        scope.row.status = !scope.row.status
      }
      sendApi(targetApi, scope, targetApi.isLoading, targetApi.isMessage)
        .then(() => {
          onSearch()
        })
        .catch(() => {
          onSearch()
        })
    }
  }

  function onColumnHrefClick(href: string | undefined, row: any) {
    const route = handleApiPath(href, row)
    if (route.startsWith('/')) {
      router.push(route)
    } else {
      window.open(route)
    }
  }

  return {
    table,
    tableActionData,
    getColumnTagsData,
    handleColumnsMap,
    updateStatus,
    onColumnHrefClick
  }
}
