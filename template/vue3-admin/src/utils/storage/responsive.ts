// 响应式storage
import { App } from "vue";
import Storage from "responsive-storage";

const nameSpace = "responsive-";

export const injectResponsiveStorage = (app: App, config: ServerConfigs) => {
  const configObj = Object.assign(
    {
      // layout模式以及主题
      layout: Storage.getData('layout', nameSpace) ?? {
        layout: config.Layout ?? 'vertical',
        theme: config.EpTheme ?? 'default',
        sidebarStatus: config.SidebarStatus ?? true,
        epThemeColor: config.EpThemeColor ?? '#409EFF',
      },
      configure: Storage.getData('configure', nameSpace) ?? {
        hideTabs: config.HideTabs ?? false,
        showLogo: config.ShowLogo ?? true,
        showModel: config.ShowModel ?? 'smart',
        multiTagsCache: config.MultiTagsCache ?? false,
      },
    },
    config.MultiTagsCache
      ? {
          // 默认显示首页tag
          tags: Storage.getData('tags', nameSpace) ?? [
            {
              path: '/home',
              parentPath: '/',
              meta: {
                title: '首页',
                icon: 'home-filled',
              },
            },
          ],
        }
      : {}
  )

  app.use(Storage, { nameSpace, memory: configObj })
}

