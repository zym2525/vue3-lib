import { RouteLocationNormalized } from 'vue-router'

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    keepAlive?: boolean
    refreshRedirect?: string
    dynamicLevel?: string
    rank?: number
    needAuth?: boolean
    icon?: string
    title?: string
    showLink?: boolean
    moduleId?: string
  }

  name: string

  children?: toRouteType[]
  redirect: string
  component?: any
}

export interface RouteInfo {
  path: string
  redirect?: string
  meta?: MyRouteMeta
  name?: string
  component?: any
}

export interface MyRouteMeta {
  title?: string
  rank?: number
  icon?: string
  needAuth?: boolean
  keepAlive?: boolean
  refreshRedirect?: string
  dynamicLevel?: string
  moduleId?: string
  showLink?: boolean
}
