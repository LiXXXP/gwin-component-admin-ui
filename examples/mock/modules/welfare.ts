import { MockMethod } from 'vite-plugin-mock'

const welfareMock: MockMethod[] = [
  {
    url: '/sp/v1/AdminWelfareListInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      body: {
        dataList: [
          {
            advNo: 'ADV2022050201',
            advUri: 'http://inews.gtimg.com/newsapp_bt/0/13960025029/641',
            bannerUri: 'http://inews.gtimg.com/newsapp_bt/0/13960025029/641',
            id: 0,
            name: '广告名称1',
            sortNo: 0,
            updateAt: '2022-05-18T10:05:35.122Z'
          },
          {
            advNo: 'ADV2022050202',
            advUri: 'http://inews.gtimg.com/newsapp_bt/0/13960025029/641',
            bannerUri: 'http://inews.gtimg.com/newsapp_bt/0/13960025029/641',
            id: 1,
            name: '广告名称2',
            sortNo: 0,
            updateAt: '2022-05-18T10:05:35.122Z'
          }
        ]
      },
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  },
  {
    url: '/sp/v1/AdminWelfareInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      body: {
        advNo: 'ADV2022050201',
        advUri: 'http://inews.gtimg.com/newsapp_bt/0/13960025029/641',
        bannerUri: 'http://inews.gtimg.com/newsapp_bt/0/13960025029/641',
        id: 0,
        name: '广告名称1',
        sortNo: 0,
        updateAt: '2022-05-18T10:05:35.122Z'
      },
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  },
  {
    url: '/sp/v1/AdminWelfareAddition',
    method: 'post',
    statusCode: 200,
    response: {
      body: {},
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  },
  {
    url: '/sp/v1/AdminWelfareMaintenance',
    method: 'post',
    statusCode: 200,
    response: {
      body: {},
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  },
  {
    url: '/sp/v1/AdminWelfareDeleting',
    method: 'post',
    statusCode: 200,
    response: {
      body: {},
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  }
]

export default welfareMock
