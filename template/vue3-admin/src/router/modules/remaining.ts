import Layout from '@/layout/MainLayout/index.vue'
import ErrorLayout from '@/layout/ErrorLayout/index.vue'

const remainingRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录',
      showLink: false,
      rank: 101,
    },
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: Layout,
    meta: {
      title: '',
      showLink: false,
      rank: 104,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('@/views/redirect.vue'),
      },
    ],
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorLayout,
    redirect: '/error/401',
    meta: {
      title: '错误页',
      showLink: false,
    },
    children: [
      {
        path: 'error_401',
        name: '401',
        component: () => import('@/views/Error/401.vue'),
        meta: {
          title: '401',
          needAuth: false,
        },
      },
      {
        path: 'error_404',
        name: '404',
        component: () => import('@/views/Error/404.vue'),
        meta: {
          title: '404',
          needAuth: false,
        },
      },
    ],
  },
]

export default remainingRouter
