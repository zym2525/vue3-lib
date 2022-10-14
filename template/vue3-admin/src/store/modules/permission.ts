import { defineStore } from 'pinia'
import { store } from '@/store'
import { cacheType } from './types'
import { cloneDeep } from 'lodash-es'
// import { RouteConfigs } from "@/layout/types";
import { constantMenus } from '@/router/modules'
import { ascending, filterTree } from '@/router/utils'

export const usePermissionStore = defineStore({
  id: 'bole-permission',
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 深拷贝一个菜单树，与导航菜单不突出
    menusTree: [],
    // 缓存页面keepAlive
    cachePageList: [],

    // buttonAuth: [],

    // 是否拉取过菜单
    isLoaded: false,
  }),
  actions: {
    // 获取异步路由菜单
    asyncActionRoutes(routes) {
      if (this.wholeMenus.length > 0) return

      const newMenu = this.constantMenus.concat(cloneDeep(routes))

      this.wholeMenus = filterTree(ascending(newMenu))

      this.menusTree = cloneDeep(this.wholeMenus)
    },
    async addActionRoutes(routes) {
      if (this.isLoaded) {
        this.isLoaded = true
      }
      await this.asyncActionRoutes(routes)
    },
    cacheOperate({ mode, name }: cacheType) {
      switch (mode) {
        case 'add':
          this.cachePageList.push(name)
          this.cachePageList = [...new Set(this.cachePageList)]
          break
        case 'delete':
          // eslint-disable-next-line no-case-declarations
          const delIndex = this.cachePageList.findIndex((v) => v === name)
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1)
          break
      }
    },
    // 清空缓存页面
    clearAllCachePage() {
      this.cachePageList = []
    },
  },
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
