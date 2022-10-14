import { http } from '@/utils/http'
import * as dto from './model/news'

export enum Api {
  GetNewsList = '/News/GetNewsList',
  GetNewsDetailById = '/News/GetNewsById',
  SetNewsTop = '/News/SetNewsTop',
  DeleteNews = '/News/DeleteNews',

  CreateOrEditNews = '/News/CreateOrEditNews',
}

// 新闻资讯 列表
export const getNewsList = (data: dto.NewsListWithPageInput) => {
  return http.post<PageOutput<dto.INews>>(Api.GetNewsList, data)
}

// 新闻资讯 详情
export const getNewsDetailById = (params: { id: string }) => {
  return http.get<dto.NewsDetail>(Api.GetNewsDetailById, params)
}

// 新闻资讯 删除
export const deleteNewsById = (params: { id: string }) => {
  return http.delete<number>(Api.DeleteNews, params)
}

// 新闻资讯 置顶
export const setNewsTopById = (params: { id: string }) => {
  return http.get<number>(Api.SetNewsTop, params)
}

// 新闻资讯 新增或编辑
export const createOrEditNews = (data: dto.CreateOrEditNewsInput) => {
  return http.post<number>(Api.CreateOrEditNews, data)
}
