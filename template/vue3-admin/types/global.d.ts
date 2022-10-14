import type {
  ComponentRenderProxy,
  VNode,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue'
import type { ECharts } from 'echarts'
import { type ResponsiveStorage } from './index'

// GlobalComponents for Volar
declare module 'vue' {

  export interface GlobalComponents {
    IconifyIconOffline: typeof import('../src/components/ReIcon')['IconifyIconOffline']
    IconifyIconOnline: typeof import('../src/components/ReIcon')['IconifyIconOnline']
    FontIcon: typeof import('../src/components/ReIcon')['FontIcon']
    SvgIcon: typeof import('../src/components/ReIcon')['SvgIcon']
  }

  export interface ComponentCustomProperties {
    $config: ServerConfigs
  }

}

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }
  interface Window {
    // Global vue app instance
    __APP__: App<Element>
    webkitCancelAnimationFrame: (handle: number) => void
    mozCancelAnimationFrame: (handle: number) => void
    oCancelAnimationFrame: (handle: number) => void
    msCancelAnimationFrame: (handle: number) => void
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number
  }

  // vue
  type PropType<T> = VuePropType<T>

  type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type Nullable<T> = T | null
  type NonNullable<T> = T extends null | undefined ? never : T
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  type Indexable<T = any> = {
    [key: string]: T
  }
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  interface WheelEvent {
    path?: EventTarget[]
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  declare interface ViteEnv {
    /**
     * 项目本地运行端口号
     */
     VITE_PORT: number;
     /**
      * 开发环境读取配置文件路径
      */
     VITE_PUBLIC_PATH: string;
     /**
      * 开发环境代理
      */
     VITE_PROXY_DOMAIN: string;
     /**
      * 开发环境后端地址
      */
     VITE_PROXY_DOMAIN_REAL: string;
     /**
      * 开发环境路由历史模式
      */
     VITE_ROUTER_HISTORY: string;
     /**
      * 是否为打包后的文件提供传统浏览器兼容性支持 支持 true 不支持 false
      */
     VITE_LEGACY: boolean;
     /**
      * OSS上传地址
      */
     VITE_OSS_URL: string
  }

  declare interface ServerConfigs {
    Version?: string
    Title?: string
    SubTitle?: string
    FixedHeader?: boolean
    HiddenSideBar?: boolean
    MultiTagsCache?: boolean
    KeepAlive?: boolean
    Layout?: string
    HideTabs?: boolean
    ShowLogo?: boolean
    ShowModel?: string

    SidebarStatus?: boolean

    EpTheme?: string
    EpThemeColor?: string
  }

  declare interface GlobalPropertiesApi {
    $echarts: ECharts
    $storage: ResponsiveStorage
    $config: ServerConfigs
  }

  function parseInt(s: string | number, radix?: number): number

  function parseFloat(string: string | number): number

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}
