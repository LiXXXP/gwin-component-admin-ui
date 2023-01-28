<template>
  <div class="wrapper">
    <ad-form ref="commonFormRef" class="ad-common-dialog__form" :items="commonFormItems" size="default" mode="vertical">
      <template #action-form>
        <ad-search-button
          v-for="button in buttonGroup"
          :key="button.key"
          class="ad-search-form__item"
          :data="button"
          @on-click="onButtonClick"
        ></ad-search-button>
      </template>
    </ad-form>
  </div>
</template>

<script setup lang="ts">
import { NOOP } from '@vue/shared'
import { getCurrentInstance } from 'vue'
import useCommonForm from '../../lib/components/ad-table-page/useCommonForm'
import useTableConfigs from '../../lib/components/ad-table-page/useTableConfigs'
import useUtils from '../../lib/components/useUtils'

import useDetailConfig from './useDetailConfig'
import { FormItem, ButtonItem, CommonFormFrom, InteractionType, ButtonItemOnClickFunc } from '../../lib/components'

const { execStringOrFunction } = useUtils()

const ctx = getCurrentInstance()

function onButtonClick(cb: string | ButtonItemOnClickFunc) {
  execStringOrFunction(cb, ctx, {})
}

function handleFormConfigsProxy(formName: string, targetForm: FormItem[]) {
  handleFormConfigs(formName, targetForm)
}

const { tablePageConfig } = useDetailConfig()

const { commonFormRef, commonFormItems, setCommonData } = useCommonForm(
  () => {
    return {}
  },
  handleFormConfigsProxy,
  NOOP,
  tablePageConfig.forms,
  tablePageConfig.apis
)

const { buttonGroup, handleFormConfigs } = useTableConfigs(tablePageConfig, NOOP, NOOP, setCommonData)

const detail: ButtonItem = {
  key: 'detail',
  label: '详情',
  type: 'primary',
  title: '详情',
  interactionType: InteractionType.POPUP,
  formKey: 'detailForm',
  dataSourceApiKey: 'detailApi'
}
setCommonData(detail, CommonFormFrom.BUTTON)

execStringOrFunction(detail.onClick, this, {})
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 50px;
}
</style>
