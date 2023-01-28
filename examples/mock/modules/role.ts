import { MockMethod } from 'vite-plugin-mock'

const roleMock: MockMethod[] = [
  {
    url: '/role/list',
    method: 'post',
    response: {
      body: {
        dataList: [
          {
            id: 0,
            roleName: '管理员'
          },
          {
            id: 1,
            roleName: '研发'
          },
          {
            id: 2,
            roleName: '测试'
          },
          {
            id: 3,
            roleName: '设计'
          }
        ],
        page: {
          count: 30
        }
      },
      status: {
        appName: 'web-component-admin-ui',
        duration: '10',
        errorCode: '',
        memo: '',
        replyCode: '',
        replyText: '',
        success: true
      }
    }
  }
]

export default roleMock
