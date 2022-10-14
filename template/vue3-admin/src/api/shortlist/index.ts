import { http } from '@/utils/http'
import * as dto from './model/shortlist'

export enum Api {
  GetShortlistList = '/Shortlist/GetShortlistList',
  DeleteShortlist = '/Shortlist/DeleteShortlist',

  CreateOrEditShortlist = '/Shortlist/CreateOrEditShortlist',
}

// 入围名单 列表
export const getShortlistList = (data: dto.ShortlistListWithPageInput) => {
  return http.post<PageOutput<dto.IShortlist>>(Api.GetShortlistList, data)
}

// 入围名单 删除
export const deleteShortlistById = (params: { id: string }) => {
  return http.delete<number>(Api.DeleteShortlist, params)
}
