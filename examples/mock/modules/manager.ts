import { MockMethod } from 'vite-plugin-mock'

const managerMock: MockMethod[] = [
  {
    url: '/api/pwm/v1/AdminNewsListInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      status: {
        errorCode: '0',
        replyCode: null,
        replyText: null,
        memo: null,
        appName: 'gwin-pwm-server',
        duration: '0',
        success: true
      },
      body: {
        dataList: [
          {
            id: '739950265029419008',
            categoryName: '北京新闻',
            name: '但凡',
            source: null,
            createAt: 1656584356000,
            status: 1,
            type: 2,
            top: 1,
            sort: 1
          },
          {
            id: '739917725420011520',
            categoryName: '国内',
            name: '放飞',
            source: null,
            createAt: 1656576598000,
            status: 1,
            type: 2,
            top: 1,
            sort: 1
          },
          {
            id: '739586113446625280',
            categoryName: '北京新闻',
            name: '但凡',
            source: '等等',
            createAt: 1656497535000,
            status: 4,
            type: 1,
            top: 1,
            sort: 1
          },
          {
            id: '739585317480972288',
            categoryName: '国际',
            name: '最新疫情风险等级提醒（6月29日9:30）',
            source: '惠阳',
            createAt: 1656497346000,
            status: 4,
            type: 1,
            top: 1,
            sort: 1
          },
          {
            id: '739520353977180160',
            categoryName: '娱乐',
            name: '海报丨双向犇赴，只为相遇',
            source: '新湖南客户端官方帐号',
            createAt: 1656481857000,
            status: 4,
            type: 1,
            top: 1,
            sort: 1
          },
          {
            id: '739492185039904768',
            categoryName: '北京新闻',
            name: '“北京奇迹”！',
            source: '北京日报客户端 | 记者 骆倩雯 美编 赵凯峰',
            createAt: 1656475141000,
            status: 4,
            type: 1,
            top: 1,
            sort: 1
          },
          {
            id: '739230666050121728',
            categoryName: '军事',
            name: '香港警队三支“反恐战术部队”',
            source: null,
            createAt: 1656412790000,
            status: 4,
            type: 1,
            top: 2,
            sort: 1
          },
          {
            id: '738825861479170048',
            categoryName: '国内',
            name: '安徽昨日新增15例本土无症状感染者',
            source: '红星新闻',
            createAt: 1656316277000,
            status: 4,
            type: 1,
            top: 2,
            sort: 1
          },
          {
            id: '10',
            categoryName: '时政',
            name: '民政部召开社会组织专项工作动员部署电视电话会议 民政部党组成员、副部长詹成付出席会议并讲话',
            source: '公益时报',
            createAt: 1652080915000,
            status: 4,
            type: 1,
            top: 1,
            sort: 0
          },
          {
            id: '9',
            categoryName: '时政',
            name: '妇女权益保障法修订草案二审稿有增有删 ——回应关切落实责任　正视弱项完善保障',
            source: '公益时报',
            createAt: 1652080915000,
            status: 4,
            type: 1,
            top: 1,
            sort: 0
          }
        ],
        page: {
          count: 18,
          pageSize: 10,
          pageNum: 1,
          orderBy: 'pnm.id DESC',
          returnCount: true
        }
      }
    }
  },
  {
    url: '/api/pwm/v1/AdminNewsCategoryNameListInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      status: {
        errorCode: '0',
        replyCode: null,
        replyText: null,
        memo: null,
        appName: 'gwin-pwm-server',
        duration: '0',
        success: true
      },
      body: {
        dataList: [
          {
            id: '739131864065945600',
            name: '北京新闻'
          },
          {
            id: '738864948543918080',
            name: '国内'
          },
          {
            id: '739178053516017664',
            name: '国际'
          },
          {
            id: '739178260123238400',
            name: '娱乐'
          },
          {
            id: '2',
            name: '军事'
          },
          {
            id: '3',
            name: '体育'
          },
          {
            id: '1',
            name: '时政'
          }
        ]
      }
    }
  },
  {
    url: '/api/pwm/v1/AdminNewsInquiry',
    method: 'post',
    statusCode: 200,
    response: {
      status: {
        errorCode: '0',
        replyCode: null,
        replyText: null,
        memo: null,
        appName: 'gwin-pwm-server',
        duration: '0',
        success: true
      },
      body: {
        id: '738825861479170048',
        type: 1,
        categoryId: '738864948543918080',
        categoryName: '国内',
        name: '安徽昨日新增15例本土无症状感染者',
        source: '红星新闻',
        alias: '2022年6月28日0-24时，安徽省报告无新增确诊病例',
        author: null,
        summary: '四川 成都商报红星新闻官方帐号',
        originalUrl: 'https://baijiahao.baidu.com/s?id=1736925759749237814',
        coverUri:
          'https://cdgwin-test.cn-bj.ufileos.com/gwin-platform/gwin-cloud/2df059a99d474a0fa6a9c8c1aee98783.jpeg',
        sort: 1,
        top: 2,
        recommend: false,
        content:
          '<div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; font-family: arial; background-color: #ffffff;"><p data-from-paste="1" style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;">2022年6月28日0-24时，安徽省报告无新增确诊病例，无新增疑似病例，新增本土无症状感染者15例（合肥市肥西县1例、蜀山区1例，宿州市泗县13例）。</p></div><div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;"><p data-from-paste="1" style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;">截至6月28日24时，安徽省累计报告本土确诊病例1050例，累计治愈出院1044例；累计报告境外输入确诊病例15例，治愈出院15例；累计报告医学观察116218人，尚在医学观察的密切接触者1526人。</p></div><div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;"><p data-from-paste="1" style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;">截至6月28日24时，安徽省尚在医学观察的无症状感染者24例（宿州市泗县19例，合肥市瑶海区1例、肥西县1例、蜀山区1例，淮北市濉溪县2例）。</p><p data-from-paste="1" style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; box-sizing: border-box; border: 0px; vertical-align: baseline; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; word-break: break-all; padding: 0px !important; margin: 15px 0px !important 15px 0px !important;"><img src="https://cdgwin-test.cn-bj.ufileos.com/gwin-platform/gwin-cloud/a042836500c047a687443790b9cd0b37.jpeg" width="399" height="222" alt="" data-mce-src="https://cdgwin-test.cn-bj.ufileos.com/gwin-platform/gwin-cloud/a042836500c047a687443790b9cd0b37.jpeg"></p></div>',
        videoUri: null,
        status: 4,
        createAt: 1656316277000
      }
    }
  }
]

export default managerMock
