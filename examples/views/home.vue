<template>
  <div class="wrapper">
    <ad-table-page ref="tablePageRef" :table-page-config="tablePageConfig"></ad-table-page>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// import AdTablePage from '~/components' // 开发
// import { AdTablePage } from '../../lib/components'
// import config from './home.config'

import useHomeConfig, { HomeState } from './useHomeConfig'
const tablePageRef = ref()

const state = reactive<HomeState>({
  isAllowAllot: true,
  isAllowBack: true,
  isAllowLeave: true
})

const { tablePageConfig } = useHomeConfig(state, tablePageRef)
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 20px;
}
</style>
