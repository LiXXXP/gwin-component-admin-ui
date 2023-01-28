import { MockMethod } from 'vite-plugin-mock'

const chargeMock: MockMethod[] = [
  {
    url: '/sp/v1/AdminSpaceListInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      body: {
        dataList: [
          {
            id: 0,
            name: 'FFD',
            managerName: '谢忠忠',
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
            managerName: '谢忠忠',
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
    url: '/sp/v1/AdminSpaceDeleting',
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
    url: '/sp/v1/AdminSpaceInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      body: {
        id: 0,
        name: 'FFD',
        managerId: 1,
        managerName: '谢忠忠',
        managerPhone: '18101924211',
        status: 1,
        buildingArea: '50',
        buildingName: 'SOHO2',
        meetingRoom: 6,
        spaceArea: '1000',
        spaceNo: 'KJ20220506001',
        createAt: 1652845378000,
        availableArea: '1000',
        address: '北京市朝阳区光华路SOHO2',
        dataList: ['18101924211'],
        facilityFlag: [1, 2, 5],
        floors: '7F/8F',
        imagUrls: [
          {
            createAt: 1652845378000,
            url: 'https://cdgwin-test.cn-bj.ufileos.com/gwin-platform/gwin-cloud/licenseUri1652862843775.jpeg'
          }
        ],
        memo: '这里是空间',
        vrUrl: ''
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
    url: '/sms/v1/RoleItemUserListInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      body: {
        dataList: [
          {
            id: 1,
            name: '谢忠忠',
            phone: '18101924211'
          },
          {
            id: 2,
            name: '王漂亮',
            phone: '18101924278'
          }
        ]
      },
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: '设置成功',
        success: true
      }
    }
  },
  {
    url: '/sp/v1/AdminSpaceAddition',
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
        replyText: '设置成功',
        success: true
      }
    }
  },
  {
    url: '/sp/v1/AdminSpaceInfoMaintenance',
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
        replyText: '设置成功',
        success: true
      }
    }
  }
]

export default chargeMock
