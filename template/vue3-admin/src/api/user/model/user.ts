export interface UserLoginParams {
  userName: string
  userPassword: string
}

export interface UserLoginRes {
  accessToken: string
  expiresIn: number
  creationTime: string
  refreshToken: string
}
