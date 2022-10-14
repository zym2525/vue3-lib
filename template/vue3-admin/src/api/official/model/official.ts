export interface ProblemFeedbacksListInput {
  queryCondition: string
  startTime?: string
  endTime?: string
}

export type ProblemFeedbacksListWithPageInput = ProblemFeedbacksListInput & PageInput

export interface IProblemFeedback {
  id: string
  name: string
  contactPhone: string
  email: string
  problemDesc: string
  isRead: boolean | string
  creationTime: string
}

// export interface IProblemFeedbackTemplate {
//   name: string
//   contactPhone: string
//   email: string
//   problemDesc: string
//   isRead: string
//   creationTime: string
// }

export interface AttendeeListInput {
  queryCondition: string
  startTime?: string
  endTime?: string
}

export type AttendeeListWithPageInput = AttendeeListInput & PageInput

export interface IAttendee {
  id: string
  name: string
  jobTitle: string
  companyName: string
  contactPhone: string
  isRead: boolean | string
  creationTime: string
}

export interface PastReviewListInput {
  year?: number
  numberOfSession?: number
  queryCondition: string
}

export type PastReviewListWithPageInput = PastReviewListInput & PageInput

export interface IPastReview {
  id: string
  year: number
  numberOfSession: number
  city: string
  coverUrl: string
  title: string
  content: string
  description: string
  // files: PastReviewFileDto[]
  // details: PastReviewDetailDto[]
}

export interface PastReviewDetail {
  id?: string
  year: number
  numberOfSession: number
  city: string
  coverUrl: string
  title: string
  content: string
  description: string
  files: PastReviewFileDto[]
  // sequence: number
  // details: PastReviewDetailDto[]
}

export interface PastReviewFileDto {
  url: string
  name: string
  type: number
  sequence: number
}

export interface PastReviewDetailDto {
  id: string
  coverUrl: string
  title: string
  content: string
  description: string
  sequence: number
  files: PastReviewDetailFileDto[]
}

export interface PastReviewDetailFileDto {
  url: string
  name: string
  type: number
  sequence: number
}
