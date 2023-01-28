<template>
  <div class="ad-form" :class="{ 'is-horizontal': mode === 'horizontal', 'is-vertical': mode === 'vertical' }">
    <div class="ad-form__items">
      <draggable
        v-if="isDesign"
        :list="formItems"
        item-key="index"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @end="onEnd"
      >
        <template #item="{ element, index }">
          <div
            class="ad-form-design__row"
            :class="{ active: contentState.currentRow === index && contentState.currentIndex === -1 }"
            @click="onRowClick(index)"
          >
            <design-row
              :items="element"
              :size="size"
              :row="index"
              :content-state="contentState"
              :max-label-width="maxLabelWidth"
              @on-end="onEnd"
              @on-item-click="onItemClick"
              @set-item-refs="setItemRefs"
              @on-item-copy="onItemCopy"
              @on-item-delete="onItemDelete"
            ></design-row>
            <div class="ad-icons">
              <div class="ad-icons__action" @click="$emit('onRowCopy', element)">
                <svg-icon class="ad-icons__icon" icon-class="gwin-copy"></svg-icon>
                <p>复制</p>
              </div>
              <el-popconfirm title="Are you sure to delete this?" @confirm="$emit('onRowDelete', index)">
                <template #reference>
                  <div class="ad-icons__action">
                    <svg-icon class="ad-icons__icon" icon-class="gwin-delete-1"></svg-icon>
                    <p>删除</p>
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </draggable>
      <div v-for="(items, index) in formItems" v-else :key="index" class="ad-form__row">
        <ad-form-item
          v-for="item in items"
          :key="item.key"
          :ref="setItemRefs"
          class="ad-form__item"
          :item="item"
          :size="size"
          :max-label-width="isDesign ? designMaxLabelWidth : maxLabelWidth"
        ></ad-form-item>
        <slot v-if="mode === 'horizontal'" name="action-item"></slot>
      </div>
      <slot v-if="mode === 'vertical'" name="action-item"></slot>
    </div>
    <div class="ad-form__actions">
      <slot name="action-form"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AdForm'
}
</script>
<script setup lang="ts">
import draggable from 'vuedraggable'
import { FormItem } from '../interface'
import AdFormItem from '../ad-form-item/index.vue'
import { provide, reactive } from 'vue-demi'
import { FormItemOnChangeKey } from '../symbols'
import useFormConfigs from './useFormConfigs'
import useFormOptions from './useFormOptions'
import useFormItem from './useFormItem'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import useUtils from '../useUtils'
import { useRouter } from 'vue-router'
import designRow from './design-row.vue'

export interface Props {
  formItems?: FormItem[][]
  size?: string
  mode?: string
  isDesign?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  formItems: undefined,
  size: 'default',
  mode: 'horizontal'
})

const { extra } = useUtils()
const router = useRouter()

const { publisher, getOptions, apis, maxLabelWidth, designMaxLabelWidth, handleLabelWidth } = useFormConfigs(
  props.formItems
)
const { getOptionsFromApi } = useFormOptions(props.formItems, getOptions, apis)
const {
  setItemRefs,
  formInitItemChange,
  formItemOnChange,
  validate,
  clearValidatedMessage,
  setErrorMessage,
  resetInstanceVariable
} = useFormItem(props.formItems, publisher, getOptionsFromApi)

provide(FormItemOnChangeKey, formItemOnChange)

const emit = defineEmits([
  'onEnd',
  'onRowClick',
  'onRowCopy',
  'onRowDelete',
  'onItemClick',
  'onItemCopy',
  'onItemDelete'
])

const contentState = reactive({
  currentRow: 0,
  currentIndex: 0
})

function onEnd() {
  emit('onEnd')
}

function onRowClick(row: number) {
  contentState.currentRow = row
  contentState.currentIndex = -1
  emit('onRowClick', row)
}

function onItemClick(row: number, index: number) {
  contentState.currentRow = row
  contentState.currentIndex = index
  emit('onItemClick', row, index)
}

function onItemCopy(row: number, item: FormItem) {
  emit('onItemCopy', row, item)
}

function onItemDelete(row: number, index: number) {
  emit('onItemDelete', row, index)
}

defineExpose({
  validate,
  clearValidatedMessage,
  setErrorMessage,
  resetInstanceVariable,
  formInitItemChange,
  formItemOnChange,
  contentState,
  handleLabelWidth,
  getOptionsFromApi,
  Cookies,
  dayjs,
  extra,
  router
})
</script>
