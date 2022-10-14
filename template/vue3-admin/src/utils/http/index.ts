import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { PureHttpError, PureHttpResoponse, PureHttpRequestConfig } from './types.d'
import qs from 'qs'
import NProgress from '../progress'
import { loadEnv } from '@build/index'
import { getToken } from '../storage'
import { UserLoginRes } from '@/api/user/model/user'
import { useUserStoreHook } from '@/store/modules/user'
// import { errorMessage } from '../message'

// 加载环境变量 VITE_PROXY_DOMAIN（开发环境）  VITE_PROXY_DOMAIN_REAL（打包后的线上环境）
const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = loadEnv()

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? VITE_PROXY_DOMAIN : VITE_PROXY_DOMAIN_REAL,
  timeout: 30000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
  withCredentials: true,
}

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  // 初始化配置对象
  private static initConfig: PureHttpRequestConfig = {
    isRegister: false,
    needNProcess: true,
  }

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  // 请求拦截
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig) => {
        const $config = config
        // 开启进度条动画
        if (config.needNProcess) {
          NProgress.start()
        }

        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback($config)
          return $config
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback($config)
          return $config
        }

        // if ($config.url === UserApiEnum.RefreshToken) {
        //   return $config
        // }

        const data: UserLoginRes = JSON.parse(getToken())

        // if (token && token.accessToken) {
        //   config.headers["Authorization"] = "Bearer " + token.accessToken;
        //   return $config;
        // } else {
        //   return $config;
        // }

        if (data && config.withCredentials) {
          // const now = new Date().getTime()
          // const expiresIn = data.expiresIn
          // const expired = (now - new Date(data.creationTime).getTime()) / 1000 > expiresIn - 300
          // if (expired) {
          //   // token过期刷新
          //   useUserStoreHook()
          //     .resetToken({ refreshToken: data.refreshToken })
          //     .then((res: UserLoginRes) => {
          //       config.headers['Authorization'] = 'Bearer ' + res.accessToken
          //       return $config
          //     })
          // } else {
          //   config.headers['Authorization'] = 'Bearer ' + data.accessToken
          //   return $config
          // }
          config.headers['Authorization'] = 'Bearer ' + data.accessToken
          return $config
        } else {
          return $config
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance
    instance.interceptors.response.use(
      (response: PureHttpResoponse) => {
        const $config = response.config
        // 关闭进度条动画
        if ($config.needNProcess) {
          NProgress.done()
        }
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data.result
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response)
          return response.data.result
        }
        return response.data
      },
      (error: PureHttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // $error.response.data = {}
        // 关闭进度条动画
        NProgress.done()

        if (error && error.response) {
          switch (error.response.status) {
            case 500:
              break

            case 401:
              // $error.response.data.message = 'token 失效'

              $error.response.data = {
                message: 'token 失效',
              }
              break

            case 403:
              $error.response.data = {
                message: error.response.data.error?.message,
              }

              break
          }
        }

        if (
          error.response.status === 401 ||
          (error.response.status === 403 && error.message === '未登录')
        ) {
          const userStore = useUserStoreHook()
          // if (userStore.token) {
          //   errorMessage($error.response.data.message)
          // }
          userStore.logOut($error.response.data.message)
        }

        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error.response || $error)
      }
    )
  }

  // 通用请求工具函数
  public request<T>(config: PureHttpRequestConfig): Promise<T> {
    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public post<T>(url: string, params: any, config?: PureHttpRequestConfig): Promise<T> {
    return this.request({ method: 'POST', url, data: params, ...config })
  }

  public get<T>(url: string, params?: any, config?: PureHttpRequestConfig): Promise<T> {
    return this.request({ method: 'GET', url, params, ...config })
  }

  public put<T>(url: string, params: any, config?: PureHttpRequestConfig): Promise<T> {
    return this.request({ method: 'PUT', url, data: params, ...config })
  }

  public delete<T>(url: string, params?: any, config?: PureHttpRequestConfig): Promise<T> {
    return this.request({ method: 'DELETE', url, params, ...config })
  }

  // 单独抽离的post工具函数
  // public post<T, P>(
  //   url: string,
  //   params?: T,
  //   config?: PureHttpRequestConfig
  // ): Promise<P> {
  //   return this.request<P>("post", url, params, config);
  // }

  // 单独抽离的get工具函数
  // public get<T, P>(
  //   url: string,
  //   params?: T,
  //   config?: PureHttpRequestConfig
  // ): Promise<P> {
  //   return this.request<P>("get", url, params, config);
  // }
}

export const http = new PureHttp()
