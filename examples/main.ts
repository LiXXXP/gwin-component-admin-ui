import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import './styles/element-variables.scss'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// svg-icon
import SvgIcon from '@gwin/svg-icon'
import '@gwin/svg-icon/lib/theme-default/index.css'

import 'virtual:svg-icons-register'

import AdminUI from '~/components/index' // 开发
import '~/theme-default/index.scss' // 开发

// import AdminUI from '../lib/components' // 测试
// import '../lib/theme-default/index.css' // 测试

import { commonConfig, requestContextConfig } from '@gwin/networking'

requestContextConfig.entityId = 'gwin'
requestContextConfig.channel = 'string'

commonConfig.loginCallback = () => {
  console.log('got to login')
}

commonConfig.noPermissionCallback = () => {
  console.log('got to 403 page')
}

const app = createApp(App)
import * as icons from '@element-plus/icons-vue'
Object.keys(icons).forEach((key) => {
  app.component(key, icons[key])
})
app.use(router).use(ElementPlus, { locale }).use(SvgIcon).use(AdminUI).mount('#app')
