import { http } from '@/utils/http'
import * as dto from './model/user'

export enum Api {
  UserLogin = '/accountAuth/gettoken',
  RefreshToken = '/accountAuth/gettokenbyrefreshtoken',
}

export const userLogin = (data: dto.UserLoginParams) => {
  return http.post<dto.UserLoginRes>(Api.UserLogin, data, {
    withCredentials: false,
  })
}

export const refreshToken = (params: { refreshToken: string }) => {
  return http.post<dto.UserLoginRes>(Api.RefreshToken, params)
}
