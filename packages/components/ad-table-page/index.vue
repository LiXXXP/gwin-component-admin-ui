<template>
  <div class="ad-table-page">
    <div
      v-if="
        (searchForm.formItems && searchForm.formItems.length > 0) ||
        (searchForm.actions && searchForm.actions.length > 0)
      "
      class="ad-head"
    >
      <ad-form
        ref="searchFormRef"
        class="ad-search-form"
        :form-items="searchForm.formItems"
        :size="size"
        mode="horizontal"
      >
        <template #action-item>
          <ad-search-button
            v-if="resetButton"
            :key="resetButton.key"
            class="ad-search-form__item"
            :data="resetButton"
            @on-click="onButtonClick"
          ></ad-search-button>
        </template>
        <template #action-form>
          <div v-for="(button, index) in searchForm.actions" :key="index">
            <ad-search-button
              v-if="typeof button === 'object'"
              class="ad-search-form__item"
              :data="button"
              @on-click="onButtonClick"
            ></ad-search-button>
          </div>
        </template>
      </ad-form>
    </div>
    <slot></slot>
    <div
      :class="{
        'is-body':
          (searchForm.formItems && searchForm.formItems.length > 0) ||
          (searchForm.actions && searchForm.actions.length > 0)
      }"
    >
      <el-table
        ref="table"
        v-loading="loading"
        class="ad-table"
        v-bind="tablePageConfig.tableConfig?.config"
        :data="searchResult"
        :row-key="rowKey"
        :header-row-style="{
          height: '54px',
          color: '#1A2234',
          fontSize: '14px',
          fontWeight: 600,
          background: '#FAFBFD'
        }"
        highlight-current-row
        :row-style="{
          color: '#606A78',
          fontSize: '14px',
          height: '52px'
        }"
        @sort-change="onSortChange"
        @selection-change="onSelectionChange"
      >
        <template v-for="(column, index) in tablePageConfig.tableConfig?.columns" :key="index">
          <!-- 多选框 -->
          <el-table-column v-if="column.type === 'selection'" width="40px" v-bind="column"></el-table-column>
          <el-table-column v-else v-bind="column">
            <template #default="scope">
              <!-- 索引 -->
              <template v-if="scope.column.type === 'index'">{{ scope.$index + 1 }}</template>
              <!-- tsx -->
              <template v-if="column.tsx">
                <ad-column-render :data="scope" :column="column" :table-page="ctx"></ad-column-render>
              </template>
              <!-- 二次处理：超链接，使用text按钮 -->
              <template v-else-if="column.handleType === HandleType.HREF">
                <el-button type="" text @click="onColumnHrefClick(column.href, scope.row)">
                  {{ scope.row[scope.column.property] }}
                </el-button>
              </template>
              <!-- 二次处理：标签 -->
              <template v-else-if="column.handleType === HandleType.TAGS">
                <div class="ad-tags">
                  <div
                    v-for="tag in getColumnTagsData(scope.row[scope.column.property], scope.row, column)"
                    :key="tag.value"
                    class="ad-tags__tag"
                    :style="tag.style"
                  >
                    {{ tag.label }}
                  </div>
                </div>
              </template>
              <!-- 二次处理：时间戳 -->
              <template v-else-if="column.handleType === HandleType.TIME">
                <div>
                  {{
                    scope.row[scope.column.property]
                      ? dayjs(scope.row[scope.column.property]).format(
                          column.dateTimeFormate ? column.dateTimeFormate : 'YYYY-MM-DD HH:mm:ss'
                        )
                      : ''
                  }}
                </div>
              </template>
              <!-- 二次处理：可操作状态，使用switch组件 -->
              <template v-else-if="scope.column.property === 'status' && column.handleType === HandleType.STATUS">
                <el-switch
                  :value="scope.row[scope.column.property]"
                  :disabled="!column.auto"
                  @change="updateStatus(scope.row)"
                ></el-switch>
              </template>
              <!-- 非操作列的剩余情况处理 -->
              <template v-else-if="scope.column.property !== 'action'">
                <!-- 变量map里获取值 -->
                <template v-if="column.variableMap && Object.keys(column.variableMap).length > 0">{{
                  handleColumnsMap(column, scope.row[scope.column.property])
                }}</template>
                <!-- map里获取值 -->
                <template v-else-if="column.map">
                  {{ (column.map.find((item) => item.value === scope.row[scope.column.property]) || {}).label }}
                </template>
                <!-- render渲染或显示数据 -->
                <template v-else>
                  {{
                    column.render
                      ? execStringOrFunction(column.render, ctx, scope.row[scope.column.property], {}, scope.row)
                      : scope.row[scope.column.property]
                  }}
                </template>
              </template>
              <!-- 操作列 -->
              <div v-else class="ad-actions">
                <template v-for="btn in tableActionData" :key="btn.key">
                  <template v-if="!btn.if || execStringOrFunction(btn.if, ctx, scope.row)">
                    <span v-if="btn.hasConfirm" class="ad-actions__action" style="margin-left: 10px">
                      <el-popconfirm
                        :title="
                          btn.confirmTitle ||
                          (typeof btn.content === 'string'
                            ? btn.content
                            : btn.content && btn.content(ctx, scope.row)) ||
                          '确定要删除吗？'
                        "
                        @confirm="execStringOrFunction(btn.onClick, ctx, scope)"
                      >
                        <template #reference>
                          <el-button
                            :icon="btn.icon"
                            :type="btn.type"
                            :text="btn.text"
                            :size="btn.size"
                            :style="btn.style"
                            :disabled="
                              typeof btn.disabled === 'function' || typeof btn.disabled === 'string'
                                ? execStringOrFunction(btn.disabled, ctx, scope.row)
                                : btn.disabled || false
                            "
                          >
                            {{ typeof btn.label === 'string' ? btn.label : btn.label && btn.label(ctx, scope.row) }}
                          </el-button>
                        </template>
                      </el-popconfirm>
                    </span>
                    <el-button
                      v-else
                      class="ad-actions__action"
                      :icon="btn.icon"
                      :type="btn.type"
                      :text="btn.text"
                      :size="btn.size"
                      :style="btn.style"
                      :disabled="
                        typeof btn.disabled === 'function' || typeof btn.disabled === 'string'
                          ? execStringOrFunction(btn.disabled, ctx, scope.row)
                          : btn.disabled || false
                      "
                      @click="execStringOrFunction(btn.onClick, ctx, scope)"
                    >
                      {{ typeof btn.label === 'string' ? btn.label : btn.label && btn.label(ctx, scope.row) }}
                    </el-button>
                  </template>
                </template>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-pagination
        v-if="tablePageConfig.tableConfig?.isTablePagination !== false"
        background
        class="ad-pagination"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="onCurrentPageChange"
        @size-change="onPageSizeChange"
      ></el-pagination>
    </div>
    <el-dialog
      v-model="isCommonDialogVisible"
      :title="commonForm.title"
      custom-class="ad-common-dialog"
      :width="commonForm.width"
      :append-to-body="true"
      :destroy-on-close="true"
      @opened="onOpendCommonDialog"
      @closed="onCanceledCommonDialog"
    >
      <ad-form
        v-if="commonForm.type === InteractionType.POPUP"
        ref="commonFormRef"
        class="ad-common-dialog__form"
        :form-items="commonForm.formItems"
        :size="size"
        :fullscreen="commonForm.fullscreen"
        mode="vertical"
      ></ad-form>
      <div v-else-if="commonForm.type === InteractionType.CONFIRM" class="ad-common-dialog__content">
        <i class="el-icon-warning" style="color: #e6a23c; font-size: 18px; margin-right: 8px"></i>
        {{ handleCommonFormContent() }}
      </div>
      <template #footer>
        <div class="ad-common-dialog__footer">
          <ad-search-button
            v-if="commonForm.cancleButton"
            :data="commonForm.cancleButton"
            @on-click="onCommonFormCancel"
          ></ad-search-button>
          <div v-for="(button, index) in commonForm.actions" :key="index">
            <ad-search-button
              v-if="typeof button === 'object'"
              :data="button"
              @on-click="onCommonFormSubmit(button)"
            ></ad-search-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AdTablePage'
}
</script>
<script setup lang="ts">
import AdForm from '../ad-form/index.vue'
import AdSearchButton from '../ad-search-button'
import AdColumnRender from '../ad-column-render'
import { ElTable, ElPagination, ElDialog, ElTableColumn, ElButton, ElSwitch, ElPopconfirm } from 'element-plus'
import { watch, onMounted, getCurrentInstance } from 'vue-demi'
import dayjs from 'dayjs'
import {
  ButtonItemOnClickFunc,
  TablePageConfig,
  HandleType,
  InteractionType,
  ButtonSize,
  FormConfig
} from '../interface'
import useTableConfigs from './useTableConfigs'
import useSearchForm from './useSearchForm'
import useCommonForm from './useCommonForm'
import useUtils from '../useUtils'
import useTable from './useTable'
import usePageParams from './usePageParams'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export interface Props {
  tablePageConfig: TablePageConfig
  size?: ButtonSize
  rowKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  rowKey: 'id'
})

const emit = defineEmits(['selectionChange'])
const ctx = getCurrentInstance()
const { execStringOrFunction, extra } = useUtils()
const router = useRouter()

function onButtonClick(cb: string | ButtonItemOnClickFunc) {
  execStringOrFunction(cb, ctx, {})
}

function onSelectionChange(selection: any[]) {
  emit('selectionChange', selection)
}

/* Proxy */
function onSearchProxy() {
  onSearch()
}

function onResetProxy() {
  onReset()
}

function getTargetSearchDataProxy() {
  return getTargetSearchData()
}

function handleFormConfigsProxy(formName: string, targetForm: FormConfig) {
  handleFormConfigs(formName, targetForm)
}

/* 分页数据 */
const { currentPage, pageSize, resetPageParams, getPageParams, onSortChange, onCurrentPageChange, onPageSizeChange } =
  usePageParams(onSearchProxy, props.tablePageConfig.tableConfig?.isTablePagination)

/* 通用弹窗 */
const {
  isCommonDialogVisible,
  commonForm,
  commonFormRef,
  setCommonData,
  onOpendCommonDialog,
  onCanceledCommonDialog,
  onCommonFormCancel,
  onCommonFormSubmit,
  handleCommonFormContent
} = useCommonForm(
  getTargetSearchDataProxy,
  handleFormConfigsProxy,
  onSearchProxy,
  props.tablePageConfig.forms,
  props.tablePageConfig.apis
)

/* 处理Config数据 */
const { searchForm, resetButton, variables, handleConfigs, handleFormConfigs } = useTableConfigs(
  props.tablePageConfig,
  onSearchProxy,
  onResetProxy,
  setCommonData
)

/* 搜索表单 */
const { searchFormRef, onSearch, onReset, loading, searchResult, total, getTargetSearchData } = useSearchForm(
  searchForm,
  props.tablePageConfig.forms?.searchForm,
  getPageParams,
  resetPageParams,
  props.tablePageConfig.apis
)

/* table */
const { table, tableActionData, getColumnTagsData, handleColumnsMap, updateStatus, onColumnHrefClick } = useTable(
  variables,
  onSearch,
  setCommonData,
  props.tablePageConfig.apis,
  props.tablePageConfig.tableConfig
)

function changePaginationJumpText() {
  document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = '跳至'
}

watch(
  () => props.tablePageConfig,
  () => {
    handleConfigs()
  },
  {
    deep: true
  }
)

onMounted(() => {
  props.tablePageConfig.isMountedSearch !== false && onSearch()
  if (props.tablePageConfig.tableConfig?.isTablePagination !== false) {
    changePaginationJumpText()
  }
})

defineExpose({
  extra,
  setCommonData,
  Cookies,
  dayjs,
  router
})
</script>
