import type { App } from 'vue'
import AdFormItem from './index.vue'

type SFCWithInstall<T> = T & { install(app: App): void } // vue 安装

// 安装
AdFormItem.install = (app: App) => {
  app.component(AdFormItem.name, AdFormItem)
}

const InAdFormItem: SFCWithInstall<typeof AdFormItem> = AdFormItem as SFCWithInstall<typeof AdFormItem> // 增加类型

export default InAdFormItem
