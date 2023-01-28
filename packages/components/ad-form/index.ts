import type { App } from 'vue'
import AdForm from './index.vue'

type SFCWithInstall<T> = T & { install(app: App): void } // vue 安装

// 安装
AdForm.install = (app: App) => {
  app.component(AdForm.name, AdForm)
}

const InAdForm: SFCWithInstall<typeof AdForm> = AdForm as SFCWithInstall<typeof AdForm> // 增加类型

export default InAdForm
