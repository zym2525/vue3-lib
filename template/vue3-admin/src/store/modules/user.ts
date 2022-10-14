import Vrouter from '@/router'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { userType } from './types'
import { userLogin, refreshToken } from '@/api/user'
import { UserLoginParams } from '@/api/user/model/user'
import { getToken, setToken, removeToken, removeUserInfo, setUserInfo } from '@/utils'
import { useMultiTagsStoreHook } from '@/store/modules/multiTags'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { errorMessage } from '@/utils'

const data = getToken()
let token = ''
let name = ''

if (data) {
  const dataJson = JSON.parse(data)
  if (dataJson) {
    token = dataJson?.accessToken
    name = dataJson?.name ?? 'admin'
  }
}

export const useUserStore = defineStore({
  id: 'bole-user',
  state: (): userType => ({
    token,
    name,
  }),

  getters: {
    accessToken() {
      return this.token
    },
  },
  actions: {
    SET_TOKEN(token) {
      this.token = token
    },
    SET_NAME(name) {
      this.name = name
    },
    // 用户登入
    loginByUsername(data: UserLoginParams) {
      return new Promise<void>((resolve, reject) => {
        userLogin(data)
          .then((res) => {
            if (res) {
              this.SET_TOKEN(res.accessToken)
              setToken(JSON.stringify(res))

              // 获取用户信息

              this.SET_NAME(data.userName)
              setUserInfo({ username: data.userName })

              resolve()
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登出 清空缓存
    logOut(msg = '') {
      this.token = ''
      this.name = ''
      removeToken()
      removeUserInfo()

      usePermissionStoreHook().wholeMenus = []
      useMultiTagsStoreHook().handleTags('equal', [
        {
          path: '/home',
          parentPath: '/',
          meta: {
            title: '首页',
            icon: 'home-filled',
          },
        },
      ])

      Vrouter.push('/login').then(() => {
        msg && errorMessage(msg)
      })
    },

    resetToken(data) {
      this.token = ''
      removeToken() // 清除旧的token 腾位置
      return refreshToken(data).then((res) => {
        if (res) {
          this.SET_TOKEN(res.accessToken)
          setToken(JSON.stringify(res))
          return Promise.resolve(res)
        }
      })
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
