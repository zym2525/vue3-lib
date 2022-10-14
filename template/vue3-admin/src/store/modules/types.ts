import { RouteRecordName } from 'vue-router'

export type cacheType = {
  mode: string
  name?: RouteRecordName
}

export type positionType = {
  startIndex?: number
  length?: number
}

export type appType = {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
    // 判断是否手动点击Hamburger
    isClickHamburger: boolean
  }
  layout: string
  device: string
  clientHeight: number
  clientWidth: number
}

export type multiType = {
  path: string
  parentPath: string
  name: string
  meta: any
  query?: object
}

export type setType = {
  title: string
  subTitle: string
  fixedHeader: boolean
  hiddenSideBar: boolean
}

export type userType = {
  token: string
  name?: string
}
