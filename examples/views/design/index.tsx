import { FormItem, FormItemType, LabelType, AdFormItemInstance, TablePageConfig } from '~/components'
export default function useIndexConfig() {
  const tablePageConfig: TablePageConfig = {
    forms: {
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
            },
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
            },
            {
              key: 'skill2',
              label: '技能2',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECTV2,
              data: {
                options: []
              }
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
            },
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
            },
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
                }
              },
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'componentsVariables'
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
            },
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
          [],
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
      }
    },
    apis: {
      createApi: {
        key: 'createApi',
        path: '/user/create'
      },
      upApi: {
        key: 'upApi',
        path: '/user/update'
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
            value: 'iOS',
            style: { 'background-color': '#11EEAA', 'border-color': '#11EEAA' }
          },
          { label: 'Android', value: 'Android' },
          {
            label: 'Vue',
            value: 'Vue',
            style: { 'background-color': '#AA33BB', 'border-color': '#AA33BB' }
          },
          {
            label: '摄影',
            value: 'photo',
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
      }
    }
  }
  return {
    tablePageConfig
  }
}
