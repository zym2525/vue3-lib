import { toRouteType } from './types'
import NProgress from '@/utils/progress'
import { constantRoutes } from './modules'
import { split, findIndex } from 'lodash-es'
import remainingRouter from './modules/remaining'
import { Title } from '../../public/serverConfig.json'
import { useMultiTagsStoreHook } from '@/store/modules/multiTags'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { Router, RouteMeta, createRouter, RouteRecordName, RouteQueryAndHash } from 'vue-router'
import {
  initRouter,
  getHistoryMode,
  getParentPaths,
  findRouteByPath,
  handleAliveRoute,
} from './utils'
import { getUserInfo, openLink } from '@/utils'

// 创建路由实例
export const router: Router = createRouter({
  history: getHistoryMode(),
  routes: constantRoutes.concat(...(remainingRouter as any)),

  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  },
})

// 路由白名单
const whiteList = ['/login']

router.beforeEach((to: toRouteType, _from, next) => {
  if (to.meta?.keepAlive) {
    const newMatched = to.matched

    handleAliveRoute(newMatched, 'add')
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === 'redirect') {
      handleAliveRoute(newMatched)
    }
  }

  const userInfo = getUserInfo()

  NProgress.start()
  const externalLink = to?.redirectedFrom?.fullPath
  if (!externalLink)
    to.matched.some((item) => {
      if (!item.meta.title) return ''
      if (Title) document.title = `${Title}`
      else document.title = item.meta.title as string
    })

  if (userInfo && userInfo.username) {
    if (_from?.name) {
      // 如果路由包含http 则是超链接 反之是普通路由
      if (externalLink && externalLink.includes('http')) {
        openLink(`http${split(externalLink, 'http')[1]}`)
        NProgress.done()
      } else {
        next()
      }
    } else {
      // 刷新
      if (usePermissionStoreHook().wholeMenus.length === 0) {
        initRouter().then((router: Router) => {
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const handTag = (
              path: string,
              parentPath: string,
              name: RouteRecordName,
              meta: RouteMeta,
              query: RouteQueryAndHash
            ): void => {
              useMultiTagsStoreHook().handleTags('push', {
                path,
                parentPath,
                name,
                meta,
                query,
              })
            }
            // 未开启标签页缓存，刷新页面重定向到顶级路由（参考标签页操作例子，只针对静态路由）
            if (to.meta?.refreshRedirect) {
              const routes = router.options.routes as toRouteType[]
              const { refreshRedirect } = to.meta
              const { name, meta } = findRouteByPath(refreshRedirect, routes)
              handTag(
                refreshRedirect,
                getParentPaths(refreshRedirect, routes)[1],
                name,
                meta,
                to.query
              )
              return router.push(refreshRedirect)
            } else {
              const { path } = to
              const index = findIndex(remainingRouter, (v) => {
                return v.path === path
              })

              const routes =
                index !== -1
                  ? (router.options.routes[0].children as toRouteType[])
                  : (router.options.routes as toRouteType[])
              // const routes = router.options.routes;
              const route = findRouteByPath(path, routes)
              const routePartent = getParentPaths(path, routes)
              if (route) {
                // 未开启标签页缓存，刷新页面重定向到顶级路由（参考标签页操作例子，只针对动态路由）
                if (
                  route &&
                  path !== routes[0].path &&
                  // route?.meta?.rank !== 0 &&
                  routePartent.length === 0
                ) {
                  if (!route?.meta?.refreshRedirect) return
                  const { name, meta } = findRouteByPath(route.meta.refreshRedirect, routes)
                  handTag(
                    route.meta?.refreshRedirect,
                    getParentPaths(route.meta?.refreshRedirect, routes)[0],
                    name,
                    meta,
                    to.query
                  )
                  return router.push({
                    path: route.meta?.refreshRedirect,
                    query: to.query,
                  })
                } else {
                  handTag(
                    route.path,
                    routePartent[routePartent.length - 1],
                    route.name,
                    route.meta,
                    to.query
                  )
                  return router.push({
                    path,
                    query: to.query,
                  })
                }
              }
            }
          }

          // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path !== '/login') {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
