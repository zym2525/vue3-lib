const adminRouter = [
  {
    path: '/Form',
    name: 'Form',
    redirect: '/Form/Feedback',
    meta: {
      title: '表单',
      showLink: true,
      icon: 'jiaoseguanli',
    },
    children: [
      {
        path: '/Form/Feedback',
        name: 'Feedback',
        meta: {
          title: '问题反馈',
          showLink: true,
          needAuth: true,
          keepAlive: true,
          icon: 'jiaoseguanli',
        },
      },
      {
        path: '/Form/Attendee',
        name: 'Attendee',
        meta: {
          title: '参会观众注册',
          showLink: true,
          needAuth: true,
          keepAlive: true,
          icon: 'jiaoseguanli',
        },
      },
    ],
  },

  // {
  //   path: '/news',
  //   name: 'news',
  //   redirect: '/news/list',
  //   meta: {
  //     title: '新闻资讯',
  //     showLink: true,
  //     icon: 'kejipeixun',
  //   },
  //   children: [
  //     {
  //       path: '/news/list',
  //       name: 'newsList',
  //       meta: {
  //         title: '新闻资讯管理',
  //         showLink: true,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: '/news/add',
  //       name: 'newsAdd',
  //       meta: {
  //         title: '新闻资讯新增',
  //         showLink: false,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },

  //     {
  //       path: '/news/edit',
  //       name: 'newsEdit',
  //       meta: {
  //         title: '新闻资讯编辑',
  //         showLink: false,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: '/news/detail',
  //       name: 'newsDetail',
  //       meta: {
  //         title: '新闻资讯详情',
  //         showLink: false,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/shortlist',
  //   name: 'shortlist',
  //   redirect: '/shortlist/list',
  //   meta: {
  //     title: '入围管理',
  //     showLink: true,
  //     icon: 'pingtaiguanli',
  //   },
  //   children: [
  //     {
  //       path: '/shortlist/list',
  //       name: 'shortlistList',
  //       meta: {
  //         title: '入围管理',
  //         showLink: true,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/review',
  //   name: 'review',
  //   redirect: '/review/list',
  //   meta: {
  //     title: '往届回顾',
  //     showLink: true,
  //     icon: 'xuqiudingyue',
  //   },
  //   children: [
  //     {
  //       path: '/review/list',
  //       name: 'reviewList',
  //       meta: {
  //         title: '往届回顾',
  //         showLink: true,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: '/review/add',
  //       name: 'reviewAdd',
  //       meta: {
  //         title: '往届回顾新增',
  //         showLink: false,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },

  //     {
  //       path: '/review/edit',
  //       name: 'reviewEdit',
  //       meta: {
  //         title: '往届回顾编辑',
  //         showLink: false,
  //         needAuth: true,
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },
]

export default adminRouter
