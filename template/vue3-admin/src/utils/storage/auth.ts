import { storageLocal } from './storage'

const StorageKey = {
  TOKEN_KEY: 'TOKEN__',
  REFRESH_TOKEN_KEY: 'REFRESH__TOKEN__',
  USER_INFO_KEY: 'USER__INFO__',
}

export function getToken():string {
  return storageLocal.getItem(StorageKey.TOKEN_KEY)
}

export function setToken(token:string) {
  return storageLocal.setItem(StorageKey.TOKEN_KEY, token)
}

export function removeToken() {
  return storageLocal.removeItem(StorageKey.TOKEN_KEY)
}

export function getRefreshToken() {
  return storageLocal.getItem(StorageKey.REFRESH_TOKEN_KEY)
}

export function setRefreshToken(token:string) {
  return storageLocal.setItem(StorageKey.REFRESH_TOKEN_KEY, token)
}

export function removeRefreshToken() {
  return storageLocal.removeItem(StorageKey.REFRESH_TOKEN_KEY)
}

export function getUserInfo() :UserInfo{
  return storageLocal.getItem(StorageKey.USER_INFO_KEY)
}

export interface UserInfo{
  username:string
}

export function setUserInfo(userInfo:UserInfo) {
  return storageLocal.setItem(StorageKey.USER_INFO_KEY, userInfo)
}

export function removeUserInfo() {
  return storageLocal.removeItem(StorageKey.USER_INFO_KEY)
}
