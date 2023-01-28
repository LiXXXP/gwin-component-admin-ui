import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('@/views/add.vue'),
    meta: { title: '添加' }
  },
  {
    path: '/design',
    name: 'Design',
    component: () => import('@/views/design/index.vue'),
    meta: { title: '设计' }
  },
  {
    path: '/detail/:customerId',
    name: 'Detail',
    component: () => import('@/views/detail.vue'),
    meta: { title: '详情' }
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/info/index.vue'),
    meta: { title: '空间信息管理' }
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('@/views/manager/index.vue'),
    meta: { title: '空间负责人管理' }
  },
  {
    path: '/blocks',
    name: 'Blocks',
    component: () => import('@/views/blocks/index.vue'),
    meta: { title: '配置平台Demo' }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/monaco-editor/index.vue'),
    meta: { title: '代码编辑器' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
