<template>
  <div class="wrapper">
    <ad-form
      ref="commonFormRef"
      class="ad-common-dialog__form"
      :form-items="commonForm.formItems"
      size="default"
      mode="vertical"
      :is-design="true"
    >
    </ad-form>
  </div>
</template>

<script setup lang="ts">
import { NOOP } from '@vue/shared'
import useCommonForm from '~/components/ad-table-page/useCommonForm'
import useTableConfigs from '~/components/ad-table-page/useTableConfigs'
import useUtils from '~/components/useUtils'

import useAddConfig from './useAddConfig'
import { ButtonItem, CommonFormFrom, InteractionType, FormConfig } from '~/components/interface'

const { execStringOrFunction } = useUtils()

function handleFormConfigsProxy(formName: string, targetForm: FormConfig) {
  handleFormConfigs(formName, targetForm)
}

const { tablePageConfig } = useAddConfig()

const { commonFormRef, commonForm, setCommonData } = useCommonForm(
  () => {
    return {}
  },
  handleFormConfigsProxy,
  NOOP,
  tablePageConfig.forms,
  tablePageConfig.apis
)

const { handleFormConfigs } = useTableConfigs(tablePageConfig, NOOP, NOOP, setCommonData)

const create: ButtonItem = {
  key: 'create',
  label: '新增',
  type: 'primary',
  title: '新增',
  interactionType: InteractionType.POPUP,
  apiKey: 'createApi',
  formKey: 'createForm',
  onCallback: ['search', 'message']
}
setCommonData(create, CommonFormFrom.BUTTON)

execStringOrFunction(create.onClick, this, {})
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 50px;
}
</style>
