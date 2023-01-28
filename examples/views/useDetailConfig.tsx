import { FormItemType, LabelType, TablePageConfig } from '../../lib/components'

export default function useDetailConfig() {
  const tablePageConfig: TablePageConfig = {
    forms: {
      detailForm: [
        {
          key: 'visualInfo',
          label: '意见反馈信息',
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
          key: 'feedbackNo',
          label: '反馈编号',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'spaceName',
          label: '所属空间',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'userName',
          label: '反馈人姓名',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'userPhone',
          label: '反馈人手机号',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'status',
          label: '状态',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: '',
            disabled: true
          },
          isGetOptionsFromVariable: true,
          getOptionsFromVariables: {
            variableKey: 'statusVariable'
          }
        },
        {
          key: 'createAt',
          label: '创建时间',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'content',
          label: '反馈内容',
          labelType: LabelType.NORMAL,
          type: FormItemType.RENDER,
          data: {
            value: ''
          }
        },
        {
          key: 'imageUrls',
          label: '图片信息',
          type: FormItemType.UPLOAD,
          data: {
            accept: 'image/*',
            limit: Math.max,
            files: [],
            listType: 'picture-card',
            fileType: 'jpeg',
            multiple: true,
            sizeLimit: 5,
            style: {
              width: '550px !important'
            }
          }
        },
        {
          key: 'visualInfo',
          label: '回复处理',
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
          key: 'reply',
          label: '回复内容',
          labelType: LabelType.NORMAL,
          type: FormItemType.INPUT,
          required: true,
          data: {
            type: 'textarea',
            autosize: { minRows: 2 },
            style: {
              width: '220px'
            }
          }
        }
      ]
    },
    buttonGroup: [
      {
        key: 'cancel',
        label: '返回',
        icon: '',
        type: 'primary'
      }
    ],
    apis: {
      detailApi: {
        key: 'detailApi',
        path: '/sp/v1/AdminUserProposalInquiry',
        handleParams: (item: any) => {
          return { id: item.id }
        }
      }
    },
    variables: {
      statusVariable: {
        key: 'statusVariable',
        value: [
          { label: '未回复', value: 1 },
          { label: '已回复', value: 2 }
        ]
      }
    }
  }
  return {
    tablePageConfig
  }
}
