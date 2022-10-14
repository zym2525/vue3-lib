import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { getServerConfig } from './config'
import { createApp, Directive } from 'vue'
import { MotionPlugin } from '@vueuse/motion'

import { injectResponsiveStorage } from '@/utils/storage/responsive'
import 'animate.css'

// 导入公共样式
import './style/index.scss'

// 导入字体图标
// import './assets/iconfont/iconfont.js'
// import './assets/iconfont/iconfont.css'

import 'virtual:svg-icons-register'

const app = createApp(App)

// // 自定义指令
import * as directives from '@/directives'

Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 全局注册`@iconify/vue`图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon, SvgIcon } from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)
app.component('SvgIcon', SvgIcon)

getServerConfig(app).then(async (config) => {
  injectResponsiveStorage(app, config)
  setupStore(app)
  app.use(router).use(MotionPlugin)
  await router.isReady()
  app.mount('#app')
})
