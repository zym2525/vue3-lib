import { http } from '@/utils/http'
import * as dto from './model/banner'

export enum Api {
  GetBannerList = '/Banner/GetBannerList',
  DeleteBanner = '/Banner/DeleteBanner',

  CreateOrEditBanner = '/Banner/CreateOrEditBanner',
}

// Banner 列表
export const getBannerList = (data: dto.BannerListWithPageInput) => {
  return http.post<PageOutput<dto.IBanner>>(Api.GetBannerList, data)
}

// Banner 删除
export const deleteBannerById = (params: { id: string }) => {
  return http.delete<number>(Api.DeleteBanner, params)
}
