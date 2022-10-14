// 静态路由
import homeRouter from './home'
import remainingRouter from './remaining'

// import { RouteRecordRaw, RouteComponent } from "vue-router";

import { ascending, formatTwoStageRoutes, formatFlatteningRoutes } from '../utils'
import { buildHierarchyTree } from '@/utils/tree'
import { toRouteType } from '../types'

// 原始静态路由（未做任何处理）
const routes = [homeRouter]

// 导出处理后的静态路由（三级及以上的路由全部拍成二级）
export const constantRoutes = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes as toRouteType[])))
)

// 用于渲染菜单，保持原始层级
// export const constantMenus: Array<RouteComponent> = ascending(routes).concat(...remainingRouter)
export const constantMenus = ascending([]).concat(
  ...(remainingRouter as toRouteType[]).filter((x) => x.meta.needAuth)
)

// 不参与菜单的路由
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path
})
