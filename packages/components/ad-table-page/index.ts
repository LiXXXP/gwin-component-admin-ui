import type { App } from 'vue'
import AdTablePage from './index.vue'

type SFCWithInstall<T> = T & { install(app: App): void } // vue 安装

// 安装
AdTablePage.install = (app: App) => {
  app.component(AdTablePage.name, AdTablePage)
}

const InAdTablePage: SFCWithInstall<typeof AdTablePage> = AdTablePage as SFCWithInstall<typeof AdTablePage> // 增加类型

export default InAdTablePage
