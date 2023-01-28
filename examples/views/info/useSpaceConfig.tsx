import { FormItemType, HandleType, InteractionType, LabelType, TablePageConfig } from '~/components'
import dayjs from 'dayjs'

export default function useSpaceConfig() {
  const tablePageConfig: TablePageConfig = {
    forms: {
      searchForm: [
        {
          key: 'name',
          type: FormItemType.INPUT,
          data: {
            placeholder: '请输入空间名称'
          }
        },
        {
          key: 'charge',
          type: FormItemType.SELECT,
          isGetOptionsFromApi: true,
          getOptionsFromApi: {
            isMountedGet: true,
            apiKey: 'userListApi',
            labelKey: 'name',
            valueKey: 'phone'
          },
          data: {
            placeholder: '请选择空间负责人',
            filterable: true
          }
        },
        {
          key: 'status',
          type: FormItemType.SELECT,
          data: {
            placeholder: '上架状态',
            clearable: true
          },
          isGetOptionsFromVariable: true,
          getOptionsFromVariables: {
            variableKey: 'statusVariable'
          }
        },
        {
          key: 'createAt',
          type: FormItemType.DATEPICKER,
          handleKey: 'datetime',
          handleValue: ['startTime', 'endTime'],
          data: {
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            type: 'datetimerange'
          },
          status: true,
          isIgnore: false
        }
      ],
      editeForm: [
        {
          key: 'baseInfo',
          label: '空间基本信息',
          labelType: LabelType.NORMAL,
          labelStyle: {
            'font-size': '14px',
            'font-family': 'PingFangSC-Medium, PingFang SC',
            'font-weight': 500,
            color: '#1A2234'
          },
          type: FormItemType.RENDER,
          data: {
            value: ''
          },
          isIgnore: true
        },
        {
          key: 'spaceNo',
          label: '空间编号',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'name',
          label: '空间名称',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'managerName',
          label: '空间负责人',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'buildingName',
          label: '所在办公楼名称',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {
            value: ''
          }
        },
        {
          key: 'buildingArea',
          label: '建筑面积(㎡)',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {
            value: ''
          }
        },
        {
          key: 'spaceArea',
          label: '办公面积(㎡)',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {
            value: ''
          }
        },
        {
          key: 'availableArea',
          label: '可租面积(㎡)',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {
            value: ''
          },
          tip: '例：70~250'
        },
        {
          key: 'meetingRoom',
          label: '会议室(个)',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {
            value: ''
          }
        },
        {
          key: 'floors',
          label: '所在楼层',
          labelType: LabelType.NORMAL,
          type: FormItemType.SELECT,
          data: {
            value: [],
            multiple: true
          },
          isGetOptionsFromVariable: true,
          getOptionsFromVariables: {
            variableKey: 'floorVariable'
          },
          required: true,
          handleItemSetValue: (key, value) => {
            if (!value) return []
            return value.split('/')
          },
          handleItemValue: (key, value: any, r: Record<string, any>) => {
            if (!value) return ''
            const target = value.join('/')
            r[key] = target
          }
        },
        {
          key: 'address',
          label: '空间详细地址',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {},
          required: true
        },
        {
          key: 'memo',
          label: '空间简介',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {
            type: 'textarea',
            autosize: { minRows: 2 },
            style: {
              width: '220px'
            }
          }
        },
        {
          key: 'status',
          label: '状态',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {},
          isGetOptionsFromVariable: true,
          getOptionsFromVariables: {
            variableKey: 'statusVariable'
          }
        },
        {
          key: 'facilityInfo',
          label: '空间设施',
          labelType: LabelType.NORMAL,
          labelStyle: {
            'font-size': '14px',
            'font-family': 'PingFangSC-Medium, PingFang SC',
            'font-weight': 500,
            color: '#1A2234'
          },
          type: FormItemType.RENDER,
          data: {
            value: ''
          },
          isIgnore: true
        },
        {
          key: 'facilityFlag',
          label: '',
          type: FormItemType.CHECKBOX,
          data: {
            style: {
              width: '400px !important'
            }
          },
          isGetOptionsFromVariable: true,
          getOptionsFromVariables: {
            variableKey: 'facilityVariable'
          }
        },
        {
          key: 'visualInfo',
          label: '空间可视化信息',
          labelType: LabelType.NORMAL,
          labelStyle: {
            'font-size': '14px',
            'font-family': 'PingFangSC-Medium, PingFang SC',
            'font-weight': 500,
            color: '#1A2234'
          },
          type: FormItemType.RENDER,
          data: {
            value: ''
          },
          isIgnore: true
        },
        {
          key: 'imagUrls',
          label: '空间实景图',
          type: FormItemType.UPLOAD,
          data: {
            accept: 'image/*',
            limit: Number.MAX_SAFE_INTEGER,
            listType: 'picture',
            fileType: 'jpeg',
            multiple: true,
            sizeLimit: 5,
            value: []
          },
          handleItemSetValue: (key, value: any) => {
            return value.map((item: any) => {
              return {
                uid: item['createAt'],
                url: item['url']
              }
            })
          },
          handleItemValue: (key, value: any, r: Record<string, any>) => {
            if (!value) return ''
            const target = value.map((item: any) => {
              return {
                createAt: dayjs(item['uid']).format('YYYY-MM-DD HH:mm:ss'),
                url: item['url']
              }
            })
            r[key] = target
          }
        },
        {
          key: 'vrUrl',
          label: '空间VR链接地址',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          data: {}
        }
      ]
    },
    buttonGroup: [
      {
        key: 'search',
        label: '查询',
        icon: '',
        type: '',
        style: {
          color: '#000000',
          'border-color': '#000000'
        }
      },
      {
        key: 'reset',
        label: '重置',
        icon: '',
        type: ''
      }
    ],
    tableConfig: {
      columns: [
        { prop: 'spaceNo', label: '空间编号', showOverflowTooltip: false, auto: false },
        {
          prop: 'name',
          label: '空间名称',
          showOverflowTooltip: false,
          auto: false
        },
        {
          prop: 'managerName',
          label: '空间负责人',
          showOverflowTooltip: false,
          auto: false
        },
        {
          prop: 'buildingName',
          label: '所在办公楼名称',
          showOverflowTooltip: false,
          auto: false
        },
        {
          prop: 'buildingArea',
          label: '建筑面积（㎡）',
          showOverflowTooltip: false,
          auto: false
        },
        {
          prop: 'floors',
          label: '所在楼层',
          showOverflowTooltip: false,
          auto: false
        },
        {
          prop: 'spaceArea',
          label: '办公面积（㎡）',
          showOverflowTooltip: false,
          auto: false
        },

        {
          prop: 'meetingRoom',
          label: '会议室（个）',
          showOverflowTooltip: false,
          auto: false
        },
        {
          prop: 'status',
          label: '状态',
          showOverflowTooltip: false,
          auto: true,
          variableMap: { variableKey: 'statusVariable' }
        },
        {
          prop: 'createAt',
          label: '创建时间',
          showOverflowTooltip: false,
          auto: false,
          handleType: HandleType.TIME,
          sortable: true
        },
        {
          prop: 'action',
          label: '操作',
          width: '220px'
        }
      ],
      actions: [
        {
          key: 'edit',
          label: '编辑',
          type: 'primary',
          text: true,
          modalWidth: '800px',
          interactionType: InteractionType.POPUP,
          apiKey: 'updateApi',
          formKey: 'editeForm',
          dataSourceApiKey: 'detailApi',
          applyRowData: false
        },
        {
          key: 'status',
          type: 'primary',
          text: true,
          label: (ctx, row) => (row.status === 2 ? '下架' : '上架'),
          modalWidth: '500px',
          interactionType: InteractionType.CONFIRM,
          title: '提示',
          content: '请确认是否执行该操作？',
          apiKey: 'statusUpdateApi',
          onCallback: ['search', 'message']
        }
      ],
      isTablePagination: true
    },
    apis: {
      searchApi: {
        key: 'searchApi',
        path: '/sp/v1/AdminSpaceListInquiry',
        mock: {
          dataList: [
            {
              id: 0,
              name: 'FFD',
              managerName: '谢忠忠1',
              status: 1,
              buildingArea: '50',
              buildingName: 'SOHO2',
              meetingRoom: 6,
              spaceArea: '1000',
              spaceNo: 'KJ20220506001',
              floors: '7F/8F',
              createAt: 1652845378000
            },
            {
              id: 1,
              name: 'FFD1',
              managerName: '谢忠忠1',
              status: 2,
              buildingArea: '50',
              buildingName: 'SOHO2',
              meetingRoom: 12,
              spaceArea: '1000',
              spaceNo: 'KJ20220506002',
              floors: '7F/8F',
              createAt: 1652845378000
            },
            {
              id: 4,
              name: 'FFD2',
              managerName: '谢忠忠',
              status: 4,
              buildingArea: '50',
              buildingName: 'SOHO2',
              meetingRoom: 8,
              spaceArea: '1000',
              spaceNo: 'KJ20220506003',
              floors: '7F/8F',
              createAt: 1652845378000
            }
          ],
          page: {
            count: 5,
            orderBy: 'string',
            pageNum: 1,
            pageSize: 10,
            returnCount: true
          }
        }
      },
      detailApi: {
        key: 'detailApi',
        path: '/sp/v1/AdminSpaceInquiry',
        handleParams: (item: any) => {
          return { id: item.id }
        }
      },
      updateApi: {
        key: 'updateApi',
        path: '/sp/v1/AdminSpaceInfoMaintenance'
      },
      statusUpdateApi: {
        key: 'statusUpdateApi',
        path: '/sp/v1/AdminSpaceStatusMaintenance',
        handleParams: (item: any) => {
          return { id: item.id, status: item.status !== 2 ? 2 : 4 }
        }
      },
      userListApi: {
        key: 'userListApi',
        path: '/sms/v1/RoleItemUserListInquiry',
        handleParams: () => {
          return {
            role: 'manager'
          }
        }
      }
    },
    variables: {
      statusVariable: {
        key: 'statusVariable',
        value: [
          { label: '全部状态', value: '' },
          { label: '未上架', value: 1 },
          { label: '已上架', value: 2 },
          { label: '已下架', value: 4 }
        ]
      },
      floorVariable: {
        key: 'floorVariable',
        value: [
          { label: 'B2F', value: 'B2F' },
          { label: 'B1F', value: 'B1F' },
          { label: '1F', value: '1F' },
          { label: '2F', value: '2F' },
          { label: '3F', value: '3F' },
          { label: '4F', value: '4F' },
          { label: '5F', value: '5F' },
          { label: '6F', value: '6F' },
          { label: '7F', value: '7F' },
          { label: '8F', value: '8F' },
          { label: '9F', value: '9F' },
          { label: '10F', value: '10F' },
          { label: '11F', value: '11F' },
          { label: '12F', value: '12F' },
          { label: '13F', value: '13F' },
          { label: '14F', value: '14F' },
          { label: '15F', value: '15F' },
          { label: '16F', value: '16F' },
          { label: '17F', value: '17F' },
          { label: '18F', value: '18F' },
          { label: '19F', value: '19F' },
          { label: '20F', value: '20F' },
          { label: '21F', value: '21F' },
          { label: '22F', value: '22F' },
          { label: '23F', value: '23F' },
          { label: '24F', value: '24F' },
          { label: '25F', value: '25F' },
          { label: '26F', value: '26F' },
          { label: '27F', value: '27F' },
          { label: '28F', value: '28F' },
          { label: '29F', value: '29F' },
          { label: '30F', value: '30F' }
        ]
      },
      facilityVariable: {
        key: 'facilityVariable',
        value: [
          { label: 'WIFI', value: 1 },
          { label: '会议室', value: 2 },
          { label: '茶室', value: 3 },
          { label: '电话亭', value: 4 },
          { label: '休息区', value: 5 },
          { label: '停车场', value: 6 },
          { label: '书吧', value: 7 },
          { label: '活动区', value: 8 },
          { label: '文印区', value: 9 },
          { label: '自助咖啡机', value: 10 },
          { label: '自助售卖区', value: 11 },
          { label: '餐厅', value: 12 }
        ]
      }
    }
  }
  return {
    tablePageConfig
  }
}
