import { ButtonProps, ButtonType } from 'element-plus'
import { h, StyleValue } from 'vue'
import { FormItemRule } from 'element-plus'
import AdFormItem from '../ad-form-item/index.vue'

export declare type AdFormItemInstance = InstanceType<typeof AdFormItem>

export interface TablePageConfig {
  isMountedSearch?: boolean
  forms?: Record<string, FormConfig>
  apis?: Record<string, Api>
  tableConfig?: TableConfig
  variables?: Record<string, Variable>
}

export interface TableConfig {
  columns: ColumnItems[]
  actions?: ButtonItem[]
  config?: Record<string, any>
  isTablePagination?: boolean
}

export interface FormConfig {
  key: string
  title?: string
  width?: string
  fullscreen?: boolean
  formItems?: FormItem[][]
  actions?: (string | ButtonItem)[]
}

export declare type FormItem = FormItemConfig & FormItemOptionConfig & FormItemRelationConfig

export enum LabelType {
  NORMAL = 'Normal',
  VERTICAL = 'Vertical',
  ALGINRIGHT = 'AliginRight'
}

export enum FormItemType {
  INPUT = 'Input',
  INPUTNUMBER = 'InputNumber',
  SELECT = 'Select',
  SELECTV2 = 'SelectV2',
  DROPDOWN = 'Dropdown',
  DATEPICKER = 'DatePicker',
  TIMEPICKER = 'TimePicker',
  TIMESELECT = 'TimeSelect',
  RADIO = 'Radio',
  CHECKBOX = 'Checkbox',
  CASCADER = 'Cascader',
  SWITCH = 'Switch',
  TRANSFER = 'Transfer',
  SLIDER = 'Slider',
  RATE = 'Rate',
  RENDER = 'Render',
  UPLOAD = 'Upload',
  RICHTEXT = 'RichText'
}

export enum CommonFormFrom {
  BUTTON = 'button',
  ACTIONS = 'actions'
}

export interface FormItemConfig {
  key: string
  label?: string
  labelType?: LabelType
  labelStyle?: StyleValue
  type: FormItemType
  // 参考Element plus表单项属性配置
  data: Record<string, any>
  // 是否展示
  status?: boolean
  // 提交form时是否忽略
  isIgnore?: boolean
  tip?: string
  render?: FormItemRenderFunc
  handleKey?: string
  handleValue?: string[]
  handleItemValue?: string | HandleFormItemValueFunc
  handleItemSetValue?: string | HandleFormItemValueFunc
  style?: StyleValue
  required?: boolean
  rules?: FormItemRule[]
  // isCopyToOtherForm?: boolean
}

// 配置FormItem select Options相关
export interface FormItemOptionConfig {
  isGetOptionsFromApi?: boolean
  getOptionsFromApi?: OptionApi
  isGetOptionsFromVariable?: boolean
  getOptionsFromVariables?: OptionsFromVariable
  isGetOptionsFromParent?: boolean
  getOptionsFromParent?: OptionsFromParent
}

export declare type OptionApi = OptionsFromApi & Api

export interface OptionsFromApi {
  isMountedGet: boolean
  apiKey: string
  labelKey: string
  valueKey: string
  result?: Option
}

export interface OptionsFromVariable {
  variableKey: string
  labelKey?: string
  valueKey?: string
}

export interface OptionsFromParent {
  key: string
  labelKey?: string
  valueKey?: string
  isHandle?: boolean
}

// 配置FormItem联动相关
export enum RelationType {
  SUBSCRIBE = 'subscribe',
  PUBLISH = 'publish'
}

export enum RelationActionType {
  MATCH = 'match',
  CALLBACK = 'callback'
}

export interface FormItemRelationConfig {
  isRelation?: boolean
  relationType?: RelationType
  relationActionType?: RelationActionType
  relationKey?: string
  match?: string | RelationCallbackFunc
  success?: string[] | RelationCallbackFunc
  error?: string[] | RelationCallbackFunc
  finally?: string[] | RelationCallbackFunc
  onCallback?: string | RelationCallbackFunc
  subscribe?: SubPub | SubPub[]
  publish?: SubPub | SubPub[]
}

export declare type Publisher = SubPub & { subscriber: string }

export interface SubPub {
  key?: string | string[]
  match?: string | RelationCallbackFunc
  success?: string[] | RelationCallbackFunc
  error?: string[] | RelationCallbackFunc
  finally?: string[] | RelationCallbackFunc
  onCallback?: string | RelationCallbackFunc
}

export enum InteractionType {
  API = 'api',
  POPUP = 'popup',
  CONFIRM = 'confirm',
  SUBMIT = 'submit',
  CUSTOM = 'custom'
}

export interface ButtonItem {
  key: string | number
  label?: string | ColumnTSXFunc
  icon?: string
  style?: Record<string, string>
  disabled?: boolean | string | ButtonItemIsDisableFunc
  // 是否为导入
  isImport?: boolean
  importData?: Record<string, any>
  // 参考Elment Plus
  type: ButtonType
  text?: boolean
  beforeAction?: string | ButtonItemBeforeActionFunc
  interactionType?: InteractionType
  // interactionType='api'
  apiKey?: string
  onCallback?: (string | NoArgVoidFunc)[] | NoArgVoidFunc
  // interactionType='popup'
  title?: string
  formKey?: string
  applyRowData?: boolean
  dataSourceApiKey?: string // 弹窗Form表单项内容从API获取
  onCommonFormShow?: string | CommonFormShowFunc
  // interactionType='confirm'
  hasConfirm?: boolean
  confirmTitle?: string
  modalWidth?: string
  content?: string | ColumnTSXFunc
  // interactionType='custom'
  onClick?: string | ButtonItemOnClickFunc
  if?: string | ButtonItemIsShowFunc
  render?: ButtonItemRenderFunc
  // dropdown-button
  list?: ButtonItem[]
  size?: ButtonSize
}

export enum HandleType {
  HREF = 'href',
  TAGS = 'tags',
  TIME = 'time',
  STATUS = 'status'
}

export declare type ColumnItems = ColumnItem & Record<string, any>

export interface ColumnItem {
  type?: string
  prop?: string
  label?: string
  width?: string
  showOverflowTooltip?: boolean
  maxWidth?: string
  auto?: boolean
  handleType?: HandleType
  href?: string
  tagsVariables?: string
  tags?: ColumnTagsFunction
  dateTimeFormate?: string
  isVariableMap?: boolean
  variableMap?: VariableMap
  map?: Option[]
  render?: string | ColumnRenderFunc
  tsx?: ColumnTSXFunc
  sortable?: boolean
}

export interface Api {
  key?: string
  path?: string
  method?: string
  isLoading?: boolean
  isMessage?: boolean
  config?: Record<string, any>
  handleParams?: string | HandleParamsFunc
  handleResult?: string | HandleResultFunc
  success?: string | SuccessFunc
  error?: string | ErrorFunc
  mock?: Record<string, any> | Record<string, any>[]
}

export interface Variable {
  key: string
  value?: Options[]
  apiKey?: string
  handleResult?: string | HandleResultFunc
}

export interface VariableMap {
  variableKey: string
  valueKey?: string
  labelKey?: string
}

export interface Option {
  label: string
  value: any
}

export declare type Options = Option & Record<string, any>
export declare type hType = typeof h

export declare type AdUIFunction =
  | string
  | string[]
  | HandleResultFunc
  | HandleParamsFunc
  | SuccessFunc
  | ErrorFunc
  | ColumnRenderFunc
  | ButtonItemRenderFunc
  | ButtonItemIsShowFunc
  | ButtonItemOnClickFunc
  | NoArgVoidFunc
  | RelationCallbackFunc
  | FormItemRenderFunc
  | HandleFormItemValueFunc
  | FormItemOnChangeFunc

export declare type ButtonSize = ButtonProps['size']

// 处理API请求结果的函数
export declare type HandleResultFunc = (ctx: any, result: any) => any
// 处理API请求参数的函数
export declare type HandleParamsFunc = (ctx: any, params: any) => any
// 处理网络请求成功的函数
export declare type SuccessFunc = (ctx: any, result: any) => void
// 处理网络请求失败的函数
export declare type ErrorFunc = (ctx: any, error: Error) => void
// 处理表格项自定义渲染的函数
export declare type ColumnRenderFunc = (value: any, row: object) => any
// 处理表格项自定义TSX的函数
export declare type ColumnTSXFunc = (ctx: any, row: Record<string, any>) => any
// 处理表各项Tag的函数
export declare type ColumnTagsFunction = (ctx: any, value: string[], row: any, column: ColumnItems) => Options[]
// 按钮渲染函数
export declare type ButtonItemRenderFunc = (button: ButtonItem) => any
// 表格中按钮是否展示函数
export declare type ButtonItemIsShowFunc = (row: Record<string, any>) => boolean
// 表格中按钮是否可用函数
export declare type ButtonItemIsDisableFunc = (row: Record<string, any>) => boolean
// 按钮点击前处理函数
export declare type ButtonItemBeforeActionFunc = (row: Record<string, any>) => boolean
// 按钮点击事件函数
export declare type ButtonItemOnClickFunc = (row: Record<string, any>) => void
// 无参数无返回函数
export declare type NoArgVoidFunc = () => void
// FormItem 发布订阅关系match及回调函数
export declare type RelationCallbackFunc = (
  subscriber: AdFormItemInstance,
  value: any,
  publisher: AdFormItemInstance
) => void | boolean
// FormItem自定义渲染函数
export declare type FormItemRenderFunc = (item: FormItem) => any
// 处理从FormItem获取值或设置值时的处理函数
export declare type HandleFormItemValueFunc = (ctx: any, key: string, value: any, ...r: object[]) => void | any
// 处理FormItem onChange的函数
export declare type FormItemOnChangeFunc = (key: string, value: any) => void
// 处理CommonForm显示的函数
export declare type CommonFormShowFunc = (ctx: any, form: FormItem[]) => void
