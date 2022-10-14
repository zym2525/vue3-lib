import Layout from '@/layout/MainLayout/index.vue'

const homeRouter = {
  path: '/',
  component: Layout,
  redirect: '/home',
  name: '',
  meta: {
    rank: 10000,
    needAuth: true,
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home/Home.vue'),
      meta: {
        rank: 10001,
        title: '人力市场',
        needAuth: true,
        keepAlive: true,
      },
    },
  ],
}

export default homeRouter
