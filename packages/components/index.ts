import type { App } from 'vue'

// 组件引入
import AdColumnRender from './ad-column-render'
import AdDropdownButton from './ad-dropdown-button'
import AdForm from './ad-form'
import AdFormItem from './ad-form-item'
import AdSearchButton from './ad-search-button'
import AdTablePage from './ad-table-page'
// 所有组件
const components: any[] = [AdColumnRender, AdDropdownButton, AdForm, AdFormItem, AdSearchButton, AdTablePage]

/**
 * 组件注册
 * @param app Vue对象
 */
const install = (app: App) => {
  components.forEach((component) => app.component(component.name, component))
}

export * from './interface'
export * from './useUtils'
export * from './ad-table-page/useCommonForm'
export * from './ad-table-page/useTableConfigs'

// 全部导出
export default {
  install,
  ...components
}

export { AdColumnRender, AdDropdownButton, AdForm, AdFormItem, AdSearchButton, AdTablePage }
