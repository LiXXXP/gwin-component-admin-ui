import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { ref } from 'vue-demi'
import { ColumnItems } from '../interface'
export default function usePageParams(onSearch: () => void, isTablePagination?: boolean) {
  const orderByColumn = ref<any>(undefined)
  const orderByType = ref<any>(undefined)
  const currentPage = ref(1)
  const pageSize = ref(10)

  function resetPageParams() {
    currentPage.value = 1
    pageSize.value = 10
    orderByColumn.value = undefined
    orderByType.value = undefined
  }

  function getPageParams() {
    if (isTablePagination) {
      return {
        page: {
          orderByColumn: orderByColumn.value,
          orderByType: orderByType.value,
          pageNum: currentPage.value,
          pageSize: pageSize.value,
          returnCount: true
        }
      }
    } else {
      return {
        page: {
          orderByColumn: orderByColumn.value,
          orderByType: orderByType.value
        }
      }
    }
  }

  function onSortChange(column: TableColumnCtx<ColumnItems>) {
    orderByColumn.value = column.prop
    orderByType.value = column.order === 'ascending' ? 'ASC' : column.order === 'descending' ? 'DESC' : undefined
    onSearch()
  }

  function onCurrentPageChange(page: number) {
    currentPage.value = page
    onSearch()
  }

  function onPageSizeChange(size: number) {
    currentPage.value = 1
    pageSize.value = size
    onSearch()
  }

  return {
    orderByColumn,
    orderByType,
    currentPage,
    pageSize,
    resetPageParams,
    getPageParams,
    onSortChange,
    onCurrentPageChange,
    onPageSizeChange
  }
}
