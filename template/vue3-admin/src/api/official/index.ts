import { http } from '@/utils/http'
import * as dto from './model/official'

export enum Api {
  GetProblemFeedbackList = '/Official/GetProblemFeedbackList',
  ProblemFeedbacksExport = '/Official/ProblemFeedbacksExport',

  GetAttendeeList = '/Official/GetAttendeeList', // 获取参会观众
  AttendeesExport = '/Official/AttendeesExport',

  GetPastReviewList = '/Official/GetPastReviewList',
  DeletePastReview = '/Official/DeletePastReview',

  CreatePastReview = '/Official/CreatePastReview',
  UpdatePastReview = '/Official/UpdatePastReview',
  GetPastReview = '/Official/GetPastReview',
}

// 问题反馈 列表
export const getProblemFeedbackList = (data: dto.ProblemFeedbacksListWithPageInput) => {
  return http.post<PageOutput<dto.IProblemFeedback>>(Api.GetProblemFeedbackList, data)
}

// 问题反馈 列表导出
export function exportProblemFeedbacks(data: dto.ProblemFeedbacksListInput) {
  return http.request({
    url: Api.ProblemFeedbacksExport,
    method: 'POST',
    data,
    responseType: 'blob',
  })
}

// 参会观众 列表
export const getAttendeeList = (data: dto.AttendeeListWithPageInput) => {
  return http.post<PageOutput<dto.IAttendee>>(Api.GetAttendeeList, data)
}

export function exportAttendees(data: dto.AttendeeListInput) {
  return http.request({
    url: Api.AttendeesExport,
    method: 'POST',
    data,
    responseType: 'blob',
  })
}

// 历届回顾
export const getPastReviewList = (data: dto.PastReviewListWithPageInput) => {
  return http.post<PageOutput<dto.IPastReview>>(Api.GetPastReviewList, data)
}

// 历届回顾 删除
export const deleteReviewById = (params: { pastReviewId: string }) => {
  return http.delete<number>(Api.DeletePastReview, params)
}

// 历届回顾 新增或编辑
export const createReview = (data: dto.PastReviewDetail) => {
  return http.post<number>(Api.CreatePastReview, data)
}

// 历届回顾 新增或编辑
export const updateReview = (data: dto.PastReviewDetail) => {
  return http.post<number>(Api.UpdatePastReview, data)
}

export const getReviewDetailById = (params: { pastReviewId: string }) => {
  return http.get<dto.PastReviewDetail>(Api.GetPastReview, params)
}
