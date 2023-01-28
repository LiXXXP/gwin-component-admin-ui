import { FormItemType, HandleType, InteractionType, LabelType, TablePageConfig } from '~/components'
import dayjs from 'dayjs'

export default function useBlocksConfig() {
  const tablePageConfig: TablePageConfig = {
    forms: {},
    buttonGroup: [],
    tableConfig: {
      columns: [],
      actions: [],
      isTablePagination: true
    },
    apis: {},
    variables: {}
  }
  return {
    tablePageConfig
  }
}
