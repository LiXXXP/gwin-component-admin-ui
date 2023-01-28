import {
  FormItem,
  FormItemType,
  HandleType,
  LabelType,
  TablePageConfig,
  AdFormItemInstance,
  InteractionType
} from '~/components'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export interface HomeState {
  isAllowAllot: boolean
  isAllowBack: boolean
  isAllowLeave: boolean
}

export default function useHomeconfig() {
  const router = useRouter()
  const tablePageConfig: TablePageConfig = {
    forms: {
      searchForm: {
        key: 'searchForm',
        formItems: [
          [
            {
              key: 'customerId',
              type: FormItemType.INPUT,
              data: {
                placeholder: '用户Id'
              }
            },
            {
              key: 'status',
              type: FormItemType.SELECT,
              data: {
                placeholder: '业务状态',
                clearable: true
              },
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'statusVariable'
              }
            },
            {
              key: 'skill',
              type: FormItemType.SELECT,
              data: {
                placeholder: '技能',
                clearable: true
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'userSkillApi',
                labelKey: 'name',
                valueKey: 'id'
              }
              // subscribe: {
              //   key: ['status'],
              //   match: (formItem, value) => {
              //     return value !== undefined && value !== ''
              //   },
              //   success: ['getOptions'],
              //   error: ['clear']
              // }
            },
            {
              key: 'createAt',
              type: FormItemType.DATEPICKER,
              handleKey: 'time',
              handleValue: ['minCreateDate', 'maxCreateDate'],
              data: {
                'start-placeholder': '开始时间',
                'end-placeholder': '结束时间',
                type: 'datetimerange'
              },
              status: true,
              isIgnore: false
            }
          ]
        ],
        actions: [
          {
            key: 'search',
            label: '查 询',
            icon: '',
            type: '',
            style: {
              color: '#3860f4',
              'border-color': '#3860f4'
            }
          },
          {
            key: 'reset',
            label: '重置',
            icon: '',
            type: 'primary'
          },
          {
            key: 'create',
            label: '新增',
            icon: 'Plus',
            type: 'primary',
            modalWidth: '700px'
          },
          {
            key: 'create1',
            label: '新增1',
            icon: 'Plus',
            type: 'primary',
            onClick: () => {
              router.push('/add')
            }
          },
          {
            key: 'import',
            label: '导入',
            type: 'primary',
            interactionType: InteractionType.POPUP,
            title: '导入',
            modalWidth: '600px',
            formKey: 'importForm',
            apiKey: 'importApi'
          },
          {
            key: 'import1',
            label: '直接导入',
            type: 'primary',
            size: 'default',
            isImport: true,
            importData: {
              accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
              limit: 1,
              files: [],
              listType: 'text',
              sizeLimit: 5,
              type: 'text',
              action: '/api/poi/v1/ImportElementExcelData',
              isDownload: true,
              headers: {
                responseType: 'blob'
              }
            }
          },
          {
            key: 'export',
            label: '导 出',
            type: 'primary',
            beforeAction: (params: Record<string, any>) => {
              if (params.skill === undefined) {
                ElMessage.error('请选择技能')
                return false
              }
              return true
            }
          }
          // {
          //   key: 'searchResultActions',
          //   label: '查询结果操作',
          //   type: 'primary',
          //   render: function () {
          //     const searchResultActions = []
          //     const entrust2: ButtonItem = {
          //       key: 'entrust2',
          //       label: '委案',
          //       type: 'primary',
          //       onClick: () => {
          //         const item: ButtonItem = {
          //           key: 'entrust2',
          //           label: '委案',
          //           type: 'primary',
          //           interactionType: InteractionType.POPUP,
          //           apiKey: 'entrustApi2',
          //           formKey: 'entrustForm2',
          //           title: '委案',
          //           onCallback: [
          //             'search',
          //             function () {
          //               ElMessage.success('系统操作中，操作完成后请查看消息')
          //             }
          //           ]
          //         }
          //         tablePageRef.value.setCommonData(item, 'button')
          //         item.onClick && typeof item.onClick !== 'string' && item.onClick({})
          //       }
          //     }
          //     const back2: ButtonItem = {
          //       key: 'back2',
          //       label: '回收',
          //       type: 'primary',
          //       interactionType: InteractionType.CONFIRM
          //     }
          //     const leave2: ButtonItem = {
          //       key: 'leave2',
          //       label: '留案',
          //       type: 'primary',
          //       interactionType: InteractionType.POPUP
          //     }
          //     if (state.isAllowAllot) {
          //       searchResultActions.push(entrust2)
          //     }
          //     if (state.isAllowBack) {
          //       searchResultActions.push(back2)
          //     }
          //     if (state.isAllowLeave) {
          //       searchResultActions.push(leave2)
          //     }
          //     return (
          //       <ad-dropdown-button
          //         data={{ list: searchResultActions, label: '查询结果操作', key: 'search', size: 'default' }}
          //       ></ad-dropdown-button>
          //     )
          //   }
          // }
        ]
      },
      createForm: {
        key: 'createForm',
        formItems: [
          [
            {
              key: 'customerId',
              label: '用户Id',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                value: ''
              }
            }
          ],
          [
            {
              key: 'age',
              label: '年龄',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUTNUMBER,
              data: {
                value: 1,
                min: 1,
                max: 150
              },
              required: true
            }
          ],
          [
            {
              key: 'status',
              label: '业务状态',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              data: {},
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'statusVariable'
              }
            }
          ],
          [
            {
              key: 'skill2',
              label: '技能2',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECTV2,
              data: {
                options: []
              }
              // isGetOptionsFromVariable: true,
              // getOptionsFromVariables: {
              //   variableKey: 'skillVariable'
              // }
            }
          ],
          [
            {
              key: 'skill',
              label: '技能',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              data: {
                multiple: true,
                value: []
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: false,
                apiKey: 'userSkillApi',
                labelKey: 'name',
                valueKey: 'id'
              },
              subscribe: {
                key: ['status'],
                match: (formItem, value) => {
                  return value !== undefined && value !== ''
                },
                success: ['getOptions'],
                error: ['clear']
              },
              tip: '可以多选'
            }
          ],
          [
            {
              key: 'skillValue',
              label: '技能值',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {},
              subscribe: {
                key: ['skill'],
                match: (subFormItem: AdFormItemInstance, value: any) => {
                  return value !== undefined && value.length > 0
                },
                success: (subFormItem: AdFormItemInstance, value: any, pubFormItem: AdFormItemInstance) => {
                  const options = pubFormItem.props.item.data.options
                  if (options) {
                    let res = ''
                    value.forEach((i: any) => {
                      const option = options.find((j: any) => i === j.id)
                      res += '[' + option.power + ']'
                    })
                    subFormItem.props.item.data.value = res
                    subFormItem.props.item.status = true
                  } else {
                    subFormItem.props.item.data.value = ''
                    subFormItem.props.item.status = false
                  }
                }
              }
            }
          ],
          [
            {
              key: 'createAt',
              label: '日期1',
              labelType: LabelType.NORMAL,
              type: FormItemType.DATEPICKER,
              handleKey: 'date',
              data: {
                type: 'date',
                value: ''
              }
            }
          ],
          [
            {
              key: 'createDate',
              label: '日期',
              labelType: LabelType.NORMAL,
              type: FormItemType.DATEPICKER,
              handleKey: 'datetime',
              handleValue: ['minCreateDate', 'maxCreateDate'],
              data: {
                'start-placeholder': '开始日期',
                'end-placeholder': '结束日期',
                type: 'datetimerange',
                style: {
                  width: '330px !important'
                }
              }
            }
          ],
          [
            {
              key: 'createTime',
              label: '时间',
              labelType: LabelType.NORMAL,
              type: FormItemType.TIMEPICKER,
              handleKey: 'time',
              data: {
                'is-range': true
              }
            }
          ],
          [
            {
              key: 'selectTime',
              label: '执行时间',
              labelType: LabelType.NORMAL,
              type: FormItemType.TIMESELECT,
              data: {
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
            }
          ],
          [
            {
              key: 'userStatus',
              label: '用户状态',
              labelType: LabelType.NORMAL,
              type: FormItemType.RADIO,
              data: {
                options: [
                  { label: '开启', value: true },
                  { label: '关闭', value: false }
                ]
              },
              required: true
            }
          ],
          [
            {
              key: 'userRoles',
              label: '角色',
              type: FormItemType.CHECKBOX,
              data: {
                options: [
                  { label: '管理员', value: 1 },
                  { label: '研发', value: 2 },
                  { label: '测试', value: 3 }
                ],
                style: {
                  width: '330px !important'
                }
              }
            }
          ],
          [
            {
              key: 'component',
              label: '组件',
              type: FormItemType.CASCADER,
              data: {
                props: {
                  expandTrigger: 'hover'
                }
              },
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'componentsVariables'
              }
            }
          ],
          [
            {
              key: 'isPublish',
              label: '是否发布',
              type: FormItemType.SWITCH,
              data: {}
            }
          ],
          [
            {
              key: 'roleIds',
              type: FormItemType.TRANSFER,
              data: {
                titles: ['待选角色', '已选角色'],
                style: {
                  width: '600px !important'
                }
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'roleApi',
                labelKey: 'roleName',
                valueKey: 'id'
              }
            }
          ],
          [
            {
              key: 'progress',
              label: '进度',
              type: FormItemType.SLIDER,
              data: {}
            }
          ],
          [
            {
              key: 'rate',
              label: '评分',
              type: FormItemType.RATE,
              data: {}
            }
          ],
          [
            {
              key: 'render',
              label: '自定义渲染',
              type: FormItemType.RENDER,
              data: {
                value: 123
              }
            }
          ],
          [
            {
              key: 'tips',
              label: '提示',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {
                value:
                  '支持  .excel  格式，文件大小不超过5M，表格数据不超过500行，文件表头必须包括名称、坐标、是否上架等要素基础信息；注：每次导入时的数据需为同一项目下同一个要素分类的内容！'
              },
              isIgnore: true,
              render: (item: FormItem) => {
                return `<div style="width: 500px">${item.data.value}</div>`
              }
            }
          ],
          [
            {
              key: 'render2',
              label: '自定义渲染2',
              type: FormItemType.RENDER,
              data: {
                value: 1234
              },
              render: (item: FormItem) => {
                return `<div>${item.data.value}</div>`
              }
            }
          ],
          [
            {
              key: 'images',
              label: '上传图片',
              type: FormItemType.UPLOAD,
              data: {
                accept: 'image/*',
                limit: 1,
                fileType: 'jpeg',
                multiple: true,
                sizeLimit: 5,
                style: {},
                value: []
              }
            }
          ],
          [
            {
              key: 'content',
              label: '模板内容',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                type: 'textarea',
                autosize: { minRows: 2 },
                style: {
                  width: '220px'
                },
                value: ''
              },
              status: true,
              isIgnore: false,
              isGetOptionsFromApi: false,
              isGetOptionsFromVariable: false,
              isRelation: false
            }
          ],
          [
            {
              key: 'inset',
              label: '插入变量',
              labelType: LabelType.NORMAL,
              type: FormItemType.DROPDOWN,
              data: {
                options: '["label":"测试","value":1]',
                btnText: '插入变量'
              },
              status: true,
              isIgnore: true,
              isGetOptionsFromApi: false,
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'templeteVariables'
              },
              publish: {
                key: ['content'],
                onCallback: (item: AdFormItemInstance, value: any) => {
                  item.props.item.data.value += value
                }
              }
            }
          ],
          [
            {
              key: 'article',
              label: '富文本',
              labelType: LabelType.NORMAL,
              type: FormItemType.RICHTEXT,
              data: {}
            }
          ]
        ],
        actions: [
          'cancel',
          {
            key: 'save',
            label: '保存草稿',
            type: 'primary',
            apiKey: 'saveApi'
          },
          'confirm'
        ]
      },
      importForm: {
        key: 'importForm',
        formItems: [
          [
            {
              key: 'upload',
              label: '选择文件',
              labelType: LabelType.NORMAL,
              type: FormItemType.UPLOAD,
              data: {
                accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
                limit: 1,
                files: [],
                listType: 'text',
                sizeLimit: 5,
                type: 'text',
                autoUpload: false,
                showFileList: true,
                style: {
                  width: '400px'
                },
                buttonItem: {
                  label: '选择文件',
                  type: 'primary',
                  size: 'default'
                }
              },
              required: true
            }
          ],
          [
            {
              key: 'tips',
              label: '提示',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {},
              isIgnore: true,
              render: () => {
                return `<div style="width: 500px">支持 .excel 格式，文件大小不超过5M，表格数据不超过500行，文件表头必须包括名称、坐标、是否上架等要素基础信息；</div><div style="width: 500px; color: #ff0000">注：每次导入时的数据需为同一项目下同一个要素分类的内容！</div>`
              }
            }
          ]
        ],
        actions: ['cancel', 'confirm']
      },
      detailForm: {
        key: 'detailForm',
        formItems: [
          [
            {
              key: 'customerId',
              label: '用户Id',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {
                value: '',
                style: {
                  color: '#ff0000'
                }
              }
            },
            {
              key: 'age',
              label: '年龄',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {
                value: ''
              }
            }
          ],
          [
            {
              key: 'status',
              label: '业务状态',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {},
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'statusVariable'
              }
            },
            {
              key: 'header',
              label: '头像',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {},
              render: (item: FormItem) => {
                const url = item.data.value
                return <img style='width:200px; height:200px;' src={url}></img>
              }
            }
          ],
          [
            {
              key: 'skill2',
              label: '技能2',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {
                options: []
              }
              // isGetOptionsFromVariable: true,
              // getOptionsFromVariables: {
              //   variableKey: 'skillVariable'
              // }
            },
            {
              key: 'skill',
              label: '技能',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              data: {
                multiple: true,
                value: [],
                disabled: true
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: false,
                apiKey: 'userSkillApi',
                labelKey: 'name',
                valueKey: 'id'
              },
              subscribe: {
                key: ['status'],
                match: (formItem, value) => {
                  return value !== undefined && value !== ''
                },
                success: ['getOptions'],
                error: ['clear']
              },
              tip: '可以多选'
            }
          ],
          [
            {
              key: 'skillValue',
              label: '技能值',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              data: {},
              subscribe: {
                key: ['skill'],
                match: (subFormItem: AdFormItemInstance, value: any) => {
                  return value !== undefined && value.length > 0
                },
                success: (subFormItem: AdFormItemInstance, value: any, pubFormItem: AdFormItemInstance) => {
                  const options = pubFormItem.props.item.data.options
                  if (options) {
                    let res = ''
                    value.forEach((i: any) => {
                      const option = options.find((j: any) => i === j.id)
                      res += '[' + option.power + ']'
                    })
                    subFormItem.props.item.data.value = res
                    subFormItem.props.item.status = true
                  } else {
                    subFormItem.props.item.data.value = ''
                    subFormItem.props.item.status = false
                  }
                }
              }
            },
            {
              key: 'createAt',
              label: '日期',
              labelType: LabelType.NORMAL,
              type: FormItemType.RENDER,
              handleKey: 'datetime',
              data: {}
            }
          ],
          [
            {
              key: 'createTime',
              label: '时间',
              labelType: LabelType.NORMAL,
              type: FormItemType.TIMEPICKER,
              handleKey: 'time',
              data: {
                'is-range': true
              }
            },
            {
              key: 'selectTime',
              label: '执行时间',
              labelType: LabelType.NORMAL,
              type: FormItemType.TIMESELECT,
              data: {
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
            }
          ],
          [
            {
              key: 'userStatus',
              label: '用户状态',
              labelType: LabelType.NORMAL,
              type: FormItemType.RADIO,
              data: {
                options: [
                  { label: '开启', value: true },
                  { label: '关闭', value: false }
                ]
              },
              required: true
            },
            {
              key: 'userRoles',
              label: '角色',
              type: FormItemType.CHECKBOX,
              data: {
                options: [
                  { label: '管理员', value: 1 },
                  { label: '研发', value: 2 },
                  { label: '测试', value: 3 }
                ],
                style: {
                  width: '330px !important'
                }
              }
            }
          ],
          [
            {
              key: 'component',
              label: '组件',
              type: FormItemType.CASCADER,
              data: {
                props: {
                  expandTrigger: 'hover'
                },
                options: [
                  {
                    value: 'guide',
                    label: 'Guide',
                    children: [
                      {
                        value: 'disciplines',
                        label: 'Disciplines',
                        children: [
                          {
                            value: 'consistency',
                            label: 'Consistency'
                          },
                          {
                            value: 'feedback',
                            label: 'Feedback'
                          },
                          {
                            value: 'efficiency',
                            label: 'Efficiency'
                          },
                          {
                            value: 'controllability',
                            label: 'Controllability'
                          }
                        ]
                      },
                      {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [
                          {
                            value: 'side nav',
                            label: 'Side Navigation'
                          },
                          {
                            value: 'top nav',
                            label: 'Top Navigation'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    value: 'component',
                    label: 'Component',
                    children: [
                      {
                        value: 'basic',
                        label: 'Basic',
                        children: [
                          {
                            value: 'layout',
                            label: 'Layout'
                          },
                          {
                            value: 'color',
                            label: 'Color'
                          },
                          {
                            value: 'typography',
                            label: 'Typography'
                          },
                          {
                            value: 'icon',
                            label: 'Icon'
                          },
                          {
                            value: 'button',
                            label: 'Button'
                          }
                        ]
                      },
                      {
                        value: 'form',
                        label: 'Form',
                        children: [
                          {
                            value: 'radio',
                            label: 'Radio'
                          },
                          {
                            value: 'checkbox',
                            label: 'Checkbox'
                          },
                          {
                            value: 'input',
                            label: 'Input'
                          },
                          {
                            value: 'input-number',
                            label: 'InputNumber'
                          },
                          {
                            value: 'select',
                            label: 'Select'
                          },
                          {
                            value: 'cascader',
                            label: 'Cascader'
                          },
                          {
                            value: 'switch',
                            label: 'Switch'
                          },
                          {
                            value: 'slider',
                            label: 'Slider'
                          },
                          {
                            value: 'time-picker',
                            label: 'TimePicker'
                          },
                          {
                            value: 'date-picker',
                            label: 'DatePicker'
                          },
                          {
                            value: 'datetime-picker',
                            label: 'DateTimePicker'
                          },
                          {
                            value: 'upload',
                            label: 'Upload'
                          },
                          {
                            value: 'rate',
                            label: 'Rate'
                          },
                          {
                            value: 'form',
                            label: 'Form'
                          }
                        ]
                      },
                      {
                        value: 'data',
                        label: 'Data',
                        children: [
                          {
                            value: 'table',
                            label: 'Table'
                          },
                          {
                            value: 'tag',
                            label: 'Tag'
                          },
                          {
                            value: 'progress',
                            label: 'Progress'
                          },
                          {
                            value: 'tree',
                            label: 'Tree'
                          },
                          {
                            value: 'pagination',
                            label: 'Pagination'
                          },
                          {
                            value: 'badge',
                            label: 'Badge'
                          }
                        ]
                      },
                      {
                        value: 'notice',
                        label: 'Notice',
                        children: [
                          {
                            value: 'alert',
                            label: 'Alert'
                          },
                          {
                            value: 'loading',
                            label: 'Loading'
                          },
                          {
                            value: 'message',
                            label: 'Message'
                          },
                          {
                            value: 'message-box',
                            label: 'MessageBox'
                          },
                          {
                            value: 'notification',
                            label: 'Notification'
                          }
                        ]
                      },
                      {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [
                          {
                            value: 'menu',
                            label: 'Menu'
                          },
                          {
                            value: 'tabs',
                            label: 'Tabs'
                          },
                          {
                            value: 'breadcrumb',
                            label: 'Breadcrumb'
                          },
                          {
                            value: 'dropdown',
                            label: 'Dropdown'
                          },
                          {
                            value: 'steps',
                            label: 'Steps'
                          }
                        ]
                      },
                      {
                        value: 'others',
                        label: 'Others',
                        children: [
                          {
                            value: 'dialog',
                            label: 'Dialog'
                          },
                          {
                            value: 'tooltip',
                            label: 'Tooltip'
                          },
                          {
                            value: 'popover',
                            label: 'Popover'
                          },
                          {
                            value: 'card',
                            label: 'Card'
                          },
                          {
                            value: 'carousel',
                            label: 'Carousel'
                          },
                          {
                            value: 'collapse',
                            label: 'Collapse'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    value: 'resource',
                    label: 'Resource',
                    children: [
                      {
                        value: 'axure',
                        label: 'Axure Components'
                      },
                      {
                        value: 'sketch',
                        label: 'Sketch Templates'
                      },
                      {
                        value: 'docs',
                        label: 'Design Documentation'
                      }
                    ]
                  }
                ]
              }
            },
            {
              key: 'isPublish',
              label: '是否发布',
              type: FormItemType.SWITCH,
              data: {}
            }
          ],
          [
            {
              key: 'roleIds',
              type: FormItemType.TRANSFER,
              data: {
                titles: ['待选角色', '已选角色'],
                style: {
                  width: '600px !important'
                }
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'roleApi',
                labelKey: 'roleName',
                valueKey: 'id'
              }
            }
          ],
          [
            {
              key: 'progress',
              label: '进度',
              type: FormItemType.SLIDER,
              data: {}
            },
            {
              key: 'rate',
              label: '评分',
              type: FormItemType.RATE,
              data: {}
            }
          ],
          [
            {
              key: 'render',
              label: '自定义渲染',
              type: FormItemType.RENDER,
              data: {
                value: 123
              }
            }
          ],
          [
            {
              key: 'images',
              label: '上传图片',
              type: FormItemType.UPLOAD,
              data: {
                accept: 'image/*',
                limit: 1,
                fileType: 'jpeg',
                multiple: true,
                sizeLimit: 5,
                style: {},
                value: []
              }
            }
          ],
          [
            {
              key: 'content',
              label: '模板内容',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                type: 'textarea',
                autosize: { minRows: 2 },
                style: {
                  width: '220px'
                },
                value: ''
              },
              status: true,
              isIgnore: false,
              isGetOptionsFromApi: false,
              isGetOptionsFromVariable: false,
              isRelation: false
            },
            {
              key: 'inset',
              label: '插入变量',
              labelType: LabelType.NORMAL,
              type: FormItemType.DROPDOWN,
              data: {
                options: '["label":"测试","value":1]',
                btnText: '插入变量'
              },
              status: true,
              isIgnore: true,
              isGetOptionsFromApi: false,
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'templeteVariables'
              },
              publish: {
                key: ['content'],
                onCallback: (item: AdFormItemInstance, value: any) => {
                  item.props.item.data.value += value
                }
              }
            }
          ]
        ]
      }
    },
    tableConfig: {
      columns: [
        {
          showOverflowTooltip: false,
          auto: false,
          type: 'selection',
          isSearchForm: false
        },
        { label: '序号', showOverflowTooltip: false, auto: false, type: 'index', width: '100px', isSearchForm: false },
        { prop: 'customerId', label: '用户Id', showOverflowTooltip: false, auto: false },
        {
          props: 'icon',
          label: '图标',
          tsx: (ctx, scope) => {
            const url = scope.row.icon
            if (url) {
              return <img style='width: 50px; height: 50px' src={url}></img>
            }
            return <div>--</div>
          }
        },
        {
          prop: 'userName',
          label: '用户姓名',
          showOverflowTooltip: false,
          auto: false,
          handleType: HandleType.HREF,
          href: '/detail/${customerId}?systemTabName=协催列表-案件详情(${userName})'
        },
        {
          prop: 'blog',
          label: '个人博客',
          showOverflowTooltip: true,
          auto: false,
          // handleType: HandleType.HREF,
          href: '${blog}'
        },
        {
          prop: 'skill',
          label: '技能',
          handleType: HandleType.TAGS,
          tagsVariables: 'skillVariable'
        },
        {
          prop: 'status',
          label: '业务状态',
          showOverflowTooltip: false,
          handleType: HandleType.STATUS,
          auto: true,
          variableMap: { variableKey: 'statusVariable' }
        },
        {
          prop: 'userStatus',
          label: '用户状态',
          showOverflowTooltip: false,
          auto: false,
          variableMap: { variableKey: 'statusVariable' }
        },
        {
          prop: 'email',
          label: '邮箱',
          showOverflowTooltip: true,
          auto: false,
          handleType: HandleType.HREF,
          href: 'mailto:${email}'
        },
        { prop: 'business', label: '业务', showOverflowTooltip: false, auto: false },
        { prop: 'country', label: '国家', showOverflowTooltip: false, auto: false },
        {
          prop: 'address1',
          label: '地址',
          showOverflowTooltip: false,
          auto: false,
          // 这里使用TSX或者Render都可以，但推荐使用TSX，vue挂载组件时会调用render，会执行次数比较多，需要对value进行判断
          // render: (value, row) => {
          //   debugger
          //   if (value) {
          //     return '朝阳区' + value
          //   } else {
          //     return ''
          //   }
          // }
          tsx: (ctx, scope) => {
            return '朝阳区' + scope.row[scope.column.property]
          }
        },
        {
          prop: 'createAt',
          label: '创建时间',
          showOverflowTooltip: false,
          auto: false,
          handleType: HandleType.TIME,
          dateTimeFormate: 'YYYY-MM-DD HH:mm',
          sortable: true
        },
        {
          prop: 'action',
          label: '操作',
          width: '300px'
        }
      ],
      actions: [
        {
          key: 'edit',
          label: '编辑',
          type: 'primary',
          modalWidth: '700px',
          text: true,
          disabled: (item: Record<string, any>) => {
            return item.status
          }
        },
        {
          key: 'status',
          type: 'primary',
          text: true
        },
        {
          key: 'detail',
          label: '详情',
          type: 'primary',
          text: true,
          interactionType: InteractionType.POPUP,
          formKey: 'detailForm',
          dataSourceApiKey: 'detailApi',
          modalWidth: '700px',
          title: '详情'
          // onClick: '(()=>{ console.log(params)})()'
        },
        {
          key: 'delete',
          label: '删除',
          type: 'primary',
          modalWidth: '500px',
          text: true,
          content: '确定要删除此条数据吗？'
        },
        {
          key: 'password',
          label: (ctx: any, item: Record<string, any>) => {
            return item.status ? '禁用' : '启用'
          },
          type: 'primary',
          modalWidth: '500px',
          interactionType: InteractionType.CONFIRM,
          text: true,
          title: '提示',
          hasConfirm: true, // 按钮旁边的二次弹窗，否则为中间提示的弹窗
          content: (ctx: any, item: Record<string, any>) => {
            return item.status ? '确定要禁用此条数据吗？' : '确定要启用此条数据吗？'
          }
        }
      ],
      config: {
        stripe: true
      },
      isTablePagination: true
    },
    apis: {
      searchApi: {
        key: 'searchApi',
        path: '/user/list'
      },
      createApi: {
        key: 'createApi',
        path: '/user/create'
      },
      updateApi: {
        key: 'updateApi',
        path: '/user/update'
      },
      deleteApi: {
        key: 'deleteApi',
        path: '/user/delete',
        handleParams:
          '(()=>{console.log(ctx); console.log(params); delete params.blog;\ndelete params.status;\nreturn params;})()'
      },
      roleApi: {
        key: 'roleApi',
        path: '/role/list'
      },
      detailApi: {
        key: 'detailApi',
        path: '/user/detail'
      },
      exportApi: {
        key: 'exportApi',
        path: '/user/export'
      },
      userSkillApi: {
        key: 'userSkillApi',
        path: '/user/skill'
      },
      importApi: {
        key: 'importApi',
        path: '/api/poi/v1/ImportElementExcelData',
        method: 'post',
        isMessage: true,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob'
        },
        handleParams: (params) => {
          const rawFile = params.upload[0].raw
          const formData = new FormData()
          formData.append('file', rawFile)
          return formData
        }
      }
    },
    variables: {
      statusVariable: {
        key: 'statusVariable',
        value: [
          { label: '启用', value: true },
          { label: '禁用', value: false }
        ]
      },
      skillVariable: {
        key: 'skillVariable',
        value: [
          {
            label: 'iOS',
            value: 1,
            style: { 'background-color': '#11EEAA', 'border-color': '#11EEAA' }
          },
          { label: 'Android', value: 2 },
          {
            label: 'Vue',
            value: 3,
            style: { 'background-color': '#AA33BB', 'border-color': '#AA33BB' }
          },
          {
            label: '摄影',
            value: 4,
            style: { 'background-color': '#EE99CC', 'border-color': '#EE99CC' }
          }
        ]
      },
      templeteVariables: {
        key: 'templeteVariables',
        value: [
          {
            value: '{姓名}',
            key: 'REAL_NAME',
            label: '姓名'
          },
          {
            value: '{性别}',
            key: 'GENDER',
            label: '性别'
          },
          {
            value: '{逾期天数}',
            key: 'MAX_OVERDUE_DAYS',
            label: '逾期天数'
          },
          {
            value: '{逾期金额}',
            key: 'TOTAL_OVERDUE',
            label: '逾期金额'
          }
        ]
      },
      componentsVariables: {
        key: 'componentsVariables',
        value: [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback'
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency'
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation'
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation'
                  }
                ]
              }
            ]
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout'
                  },
                  {
                    value: 'color',
                    label: 'Color'
                  },
                  {
                    value: 'typography',
                    label: 'Typography'
                  },
                  {
                    value: 'icon',
                    label: 'Icon'
                  },
                  {
                    value: 'button',
                    label: 'Button'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox'
                  },
                  {
                    value: 'input',
                    label: 'Input'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber'
                  },
                  {
                    value: 'select',
                    label: 'Select'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader'
                  },
                  {
                    value: 'switch',
                    label: 'Switch'
                  },
                  {
                    value: 'slider',
                    label: 'Slider'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker'
                  },
                  {
                    value: 'upload',
                    label: 'Upload'
                  },
                  {
                    value: 'rate',
                    label: 'Rate'
                  },
                  {
                    value: 'form',
                    label: 'Form'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table'
                  },
                  {
                    value: 'tag',
                    label: 'Tag'
                  },
                  {
                    value: 'progress',
                    label: 'Progress'
                  },
                  {
                    value: 'tree',
                    label: 'Tree'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination'
                  },
                  {
                    value: 'badge',
                    label: 'Badge'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert'
                  },
                  {
                    value: 'loading',
                    label: 'Loading'
                  },
                  {
                    value: 'message',
                    label: 'Message'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox'
                  },
                  {
                    value: 'notification',
                    label: 'Notification'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown'
                  },
                  {
                    value: 'steps',
                    label: 'Steps'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip'
                  },
                  {
                    value: 'popover',
                    label: 'Popover'
                  },
                  {
                    value: 'card',
                    label: 'Card'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse'
                  }
                ]
              }
            ]
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'docs',
                label: 'Design Documentation'
              }
            ]
          }
        ]
      }
    }
  }
  return {
    tablePageConfig
  }
}
