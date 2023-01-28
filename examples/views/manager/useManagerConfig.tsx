import * as AdminUI from '~/components'

export default function useManagerConfig() {
  const tablePageConfig: AdminUI.TablePageConfig = {
    forms: {
      searchForm: {
        key: 'searchForm',
        formItems: [
          [
            {
              key: 'name',
              type: AdminUI.FormItemType.INPUT,
              data: {
                placeholder: '请输入内容名称',
                clearable: true
              }
            },
            {
              key: 'status',
              type: AdminUI.FormItemType.SELECT,
              data: {
                placeholder: '全部状态',
                clearable: true
              },
              getOptionsFromVariables: {
                variableKey: 'statusVar',
                valueKey: 'value',
                labelKey: 'label'
              },
              isGetOptionsFromVariable: true
            },
            {
              key: 'date',
              type: AdminUI.FormItemType.DATEPICKER,
              data: {
                clearable: true,
                'start-placeholder': '发布开始日期',
                'end-placeholder': '发布结束日期',
                style: {
                  width: '240px !important'
                }
              },
              handleKey: 'datetime',
              handleValue: ['startDate', 'endDate']
            },
            {
              key: 'categoryId',
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true,
                placeholder: '全部内容分类'
              },
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'categoryListApi',
                method: 'post',
                config: {
                  type: 'admin'
                },
                valueKey: 'id',
                labelKey: 'name'
              },
              isGetOptionsFromApi: true
            },
            {
              key: 'type',
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true
              },
              getOptionsFromVariables: {
                variableKey: 'typeVar',
                valueKey: 'value',
                labelKey: 'label'
              },
              isGetOptionsFromVariable: true
            },
            {
              key: 'top',
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true,
                placeholder: '置顶'
              },
              getOptionsFromVariables: {
                variableKey: 'topVar',
                valueKey: 'value',
                labelKey: 'label'
              },
              isGetOptionsFromVariable: true
            }
          ]
        ],
        actions: [
          'reset',
          'search',
          'create',
          {
            key: 'import',
            label: '导入',
            type: 'primary',
            interactionType: AdminUI.InteractionType.POPUP,
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
          'export'
          // {
          //   key: 'export',
          //   label: '导 出',
          //   type: 'primary',
          //   beforeAction: (params: Record<string, any>) => {
          //     if (params.skill === undefined) {
          //       return false
          //     }
          //     return true
          //   }
          // }
        ]
      },
      createForm: {
        key: 'createForm',
        title: '新增图文',
        width: '800px',
        formItems: [
          [
            {
              key: 'type',
              label: '内容类型',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true,
                value: 1
              },
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'typeVar'
              },
              required: true,
              tip: '必须选择一项'
            },
            {
              key: 'categoryId',
              label: '内容分类',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'categoryListApi',
                valueKey: 'id',
                labelKey: 'name'
              },
              required: true
            }
          ],
          [
            {
              key: 'name',
              label: '内容标题',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true
              },
              required: true
            },
            {
              key: 'source',
              label: '文章来源',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '30',
                'show-word-limit': true
              },
              required: false
            }
          ],
          [
            {
              key: 'alias',
              label: '内容副标题',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true
              },
              required: false
            },
            {
              key: 'author',
              label: '文章作者',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '30',
                'show-word-limit': true
              },
              required: false
            }
          ],
          [
            {
              key: 'summary',
              label: '摘要',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '100',
                'show-word-limit': true
              },
              required: true
            },
            {
              key: 'originalUrl',
              label: '原文链接',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '200',
                'show-word-limit': true
              },
              required: false
            }
          ],
          [
            {
              key: 'top',
              label: '置顶',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SWITCH,
              data: {
                clearable: true
              },
              required: false,
              handleItemSetValue: (key: any, value: any) => {
                if (value === 1) {
                  return false
                }
                if (value === 2) {
                  return true
                }
              },
              handleItemValue: (key: any, value: any, r: Record<string, any>) => {
                if (value) {
                  r[key] = 2
                } else {
                  r[key] = 1
                }
              }
            },
            {
              key: 'recommend',
              label: '推荐',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SWITCH,
              data: {
                clearable: true
              },
              required: false
            }
          ],
          [
            {
              key: 'coverUri',
              label: '封面图',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.UPLOAD,
              data: {
                accept: 'image/*',
                limit: 1,
                listType: 'picture',
                fileType: 'jpeg',
                multiple: true,
                sizeLimit: 5,
                value: []
              },
              required: true
            }
          ],
          [
            {
              key: 'content',
              label: '内容',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.RICHTEXT,
              data: {},
              required: true,
              subscribe: {
                key: 'type',
                match: '(() => {\n  return r[0] === 1\n})()',
                success: ['show'],
                error: ['clear', 'hide']
              }
            }
          ],
          [
            {
              key: 'videoUri',
              label: '上传视频',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.UPLOAD,
              data: {
                accept: 'audio/mp4, video/mp4',
                limit: 1,
                files: [],
                listType: 'text',
                sizeLimit: 5,
                type: 'text',
                autoUpload: true,
                showFileList: true,
                style: {
                  width: '400px'
                }
              },
              required: true,
              subscribe: {
                key: 'type',
                match: '(() => {\n  return r[0] === 2 \n})()',
                success: ['show'],
                error: ['hide', 'clear']
              },
              status: false,
              isIgnore: false
            }
          ]
        ],
        actions: [
          {
            key: 'cancel',
            label: '取消',
            type: ''
          },
          {
            key: 'save',
            label: '保存草稿',
            type: 'primary',
            apiKey: 'saveApi'
          },
          {
            key: 'confirm',
            label: '发布',
            type: 'primary'
          }
        ]
      },
      editForm: {
        key: 'editForm',
        width: '800px',
        title: '内容编辑',
        fullscreen: true,
        formItems: [
          [
            {
              key: 'type',
              label: '内容类型',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true
              },
              isGetOptionsFromVariable: true,
              getOptionsFromVariables: {
                variableKey: 'typeVar'
              },
              required: true
            },
            {
              key: 'categoryId',
              label: '内容分类',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SELECT,
              data: {
                clearable: true
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'categoryListApi',
                valueKey: 'id',
                labelKey: 'name'
              },
              required: true
            }
          ],
          [
            {
              key: 'name',
              label: '内容标题',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true
              },
              required: true
            },
            {
              key: 'source',
              label: '文章来源',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '30',
                'show-word-limit': true
              },
              required: false
            }
          ],
          [
            {
              key: 'alias',
              label: '内容副标题',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true
              },
              required: false
            },
            {
              key: 'author',
              label: '文章作者',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '30',
                'show-word-limit': true
              },
              required: false
            }
          ],
          [
            {
              key: 'summary',
              label: '摘要',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '100',
                'show-word-limit': true
              },
              required: true
            },
            {
              key: 'originalUrl',
              label: '原文链接',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '200',
                'show-word-limit': true
              },
              required: false
            }
          ],
          [
            {
              key: 'top',
              label: '置顶',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SWITCH,
              data: {
                clearable: true
              },
              required: false,
              handleItemSetValue: (key: any, value: any) => {
                if (value === 1) {
                  return false
                }
                if (value === 2) {
                  return true
                }
              },
              handleItemValue: (key: any, value: any, r: Record<string, any>) => {
                if (value) {
                  r[key] = 2
                } else {
                  r[key] = 1
                }
              }
            },
            {
              key: 'recommend',
              label: '推荐',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.SWITCH,
              data: {
                clearable: true
              },
              required: false
            }
          ],
          [
            {
              key: 'coverUri',
              label: '封面图',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.UPLOAD,
              data: {
                accept: 'image/*',
                limit: 1,
                listType: 'picture',
                fileType: 'jpeg',
                multiple: true,
                sizeLimit: 5,
                value: []
              },
              required: true
            }
          ],
          [
            {
              key: 'content',
              label: '内容',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.RICHTEXT,
              data: {},
              required: true,
              subscribe: {
                key: 'type',
                match: '(() => {\n  return r[0] === 1\n})()',
                success: ['show'],
                error: ['clear', 'hide']
              }
            }
          ],
          [
            {
              key: 'videoUri',
              label: '上传视频',
              labelType: AdminUI.LabelType.ALGINRIGHT,
              type: AdminUI.FormItemType.UPLOAD,
              data: {
                accept: 'audio/mp4, video/mp4',
                limit: 1,
                files: [],
                listType: 'text',
                sizeLimit: 5,
                type: 'text',
                autoUpload: true,
                showFileList: true,
                style: {
                  width: '400px'
                }
              },
              required: true,
              subscribe: {
                key: 'type',
                match: '(() => {\n  return r[0] === 2 \n})()',
                success: ['show'],
                error: ['hide', 'clear']
              },
              status: false,
              isIgnore: false
            }
          ]
        ],
        actions: [
          {
            key: 'cancel',
            label: '取消',
            type: ''
          },
          {
            key: 'confirm',
            label: '确定',
            type: 'primary'
          }
        ]
      }
    },
    tableConfig: {
      columns: [
        {
          prop: 'categoryName',
          label: '内容分类'
        },
        {
          prop: 'name',
          label: '内容名称',
          showOverflowTooltip: true
        },
        {
          prop: 'source',
          label: '来源',
          showOverflowTooltip: true
        },
        {
          prop: 'createAt',
          label: '发布时间',
          handleType: AdminUI.HandleType.TIME
        },
        {
          prop: 'status',
          label: '状态',
          variableMap: {
            variableKey: 'statusVar'
          }
        },
        {
          prop: 'type',
          label: '内容类型',
          variableMap: {
            variableKey: 'typeVar'
          }
        },
        {
          prop: 'top',
          label: '是否置顶',
          variableMap: {
            variableKey: 'topVar'
          }
        },
        {
          prop: 'action',
          label: '操作'
        }
      ],
      actions: [
        {
          key: 'edit',
          label: '编辑',
          text: true,
          type: 'primary',
          title: undefined,
          interactionType: AdminUI.InteractionType.POPUP,
          formKey: 'editForm',
          onCallback: ['search', 'message'],
          dataSourceApiKey: 'newsInquiryApi',
          apiKey: 'newsMaintenanceApi'
        },
        {
          key: 'up',
          label: '发布',
          text: true,
          type: 'primary',
          interactionType: AdminUI.InteractionType.CONFIRM,
          onCallback: ['search', 'message'],
          size: 'default',
          title: '内容发布',
          content: '确认发布此内容吗',
          modalWidth: '500px',
          if: '(() => {\n  return params.status !== 1\n})()',
          apiKey: 'statusMaintenanceApi'
        },
        {
          key: 'withdraw',
          label: '撤回',
          text: true,
          type: 'primary',
          interactionType: AdminUI.InteractionType.CONFIRM,
          onCallback: ['search', 'message'],
          size: 'default',
          title: '内容撤回',
          content: '确认撤回此内容吗？',
          modalWidth: '500px',
          if: '(() => {\n  return params.status === 1\n})()',
          apiKey: 'statusMaintenanceApi'
        },
        {
          key: 'delete',
          label: '删除',
          text: true,
          type: 'primary',
          interactionType: AdminUI.InteractionType.CONFIRM,
          onCallback: ['search', 'message'],
          size: 'default',
          title: '内容删除',
          content: '确定将删除此内容吗？',
          modalWidth: '500px',
          if: '(() => {\n  return params.status === 2\n})()',
          apiKey: 'deleteApi'
        }
      ],
      isTablePagination: true
    },
    apis: {
      searchApi: {
        key: 'searchApi',
        path: '/api/pwm/v1/AdminNewsListInquiry',
        handleParams: (params: Record<string, any>) => {
          params.page.orderBy = 'pnm.id DESC'
          return params
        }
      },
      categoryListApi: {
        key: 'categoryListApi',
        path: '/api/pwm/v1/AdminNewsCategoryNameListInquiry',
        method: 'post'
      },
      addApi: {
        key: 'addApi',
        path: '/api/pwm/v1/AdminNewsAddition',
        method: 'post',
        config: {
          type: 'admin'
        },
        handleParams: (params: Record<string, any>) => {
          return {
            ...params,
            status: 1,
            coverUri: params.coverUri?.length > 0 ? params.coverUri[0].url : null,
            videoUri: params.videoUri?.length > 0 ? params.videoUri[0].url : null
          }
        }
      },
      saveApi: {
        key: 'saveApi',
        path: '/api/pwm/v1/AdminNewsAddition',
        method: 'post',
        config: {
          type: 'admin'
        },
        handleParams: (params: Record<string, any>) => {
          return {
            ...params,
            status: 2,
            coverUri: params.coverUri?.length > 0 ? params.coverUri[0].url : null,
            videoUri: params.videoUri?.length > 0 ? params.videoUri[0].url : null
          }
        }
      },
      deleteApi: {
        key: 'deleteApi',
        path: '/api/pwm/v1/AdminNewsDeleting',
        method: 'post',
        config: {
          type: 'admin'
        },
        isLoading: true,
        isMessage: true,
        handleParams: '(() => {\n  return {\n    id: params.id\n  }\n})()'
      },
      newsInquiryApi: {
        key: 'newsInquiryApi',
        path: '/api/pwm/v1/AdminNewsInquiry',
        method: 'post',
        config: {
          type: 'admin'
        },
        handleParams: '(() => {\n  return {\n    id: params.id\n  }\n})()',
        handleResult: (body: Record<string, any>) => {
          const name = body.videoUri?.substring(body.videoUri?.lastIndexOf('/') + 1)
          if (body.coverUri) {
            body.coverUri = [{ url: body.coverUri }]
          }
          if (body.videoUri) {
            body.videoUri = [{ url: body.videoUri, name: name }]
          }
          return body
        }
      },
      newsMaintenanceApi: {
        key: 'newsMaintenanceApi',
        path: '/api/pwm/v1/AdminNewsMaintenance',
        method: 'post',
        config: {
          type: 'admin'
        },
        handleParams: (params: any) => {
          return {
            ...params,
            coverUri: params.coverUri ? params.coverUri[0]?.url : null,
            videoUri: params.videoUri ? params.videoUri[0]?.url : null
          }
        },
        isLoading: true,
        isMessage: true
      },
      statusMaintenanceApi: {
        key: 'statusMaintenanceApi',
        path: '/api/pwm/v1/AdminNewsStatusMaintenance',
        method: 'post',
        config: {
          type: 'admin'
        },
        isLoading: true,
        isMessage: true,
        handleParams: '(() => {\n  return {\n    id: params.id,\n    status: params.status === 1? 4:1\n  }\n})()'
      }
    },
    variables: {
      statusVar: {
        key: 'statusVar',
        value: [
          {
            label: '已发布',
            value: 1
          },
          {
            label: '未发布',
            value: 2
          },
          {
            label: '已撤回',
            value: 4
          }
        ],
        handleResult: ''
      },
      typeVar: {
        key: 'typeVar',
        value: [
          {
            label: '图文',
            value: 1
          },
          {
            label: '视频',
            value: 2
          }
        ]
      },
      topVar: {
        key: 'topVar',
        value: [
          {
            label: '不置顶',
            value: 1
          },
          {
            label: '置顶',
            value: 2
          }
        ]
      }
    }
  }
  return {
    tablePageConfig
  }
}
