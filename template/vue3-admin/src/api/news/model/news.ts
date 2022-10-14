export interface NewsListWithPageInput extends PageInput {
  title: string
  type?: number
  startTime?: string
  endTime?: string
  isTop?: boolean
}

export interface INews {
  id: string
  title: string
  type: number | string
  publisher: string
  isTop: boolean | string
  viewCount: number
  publishTime: string
}

export interface NewsDetail {
  id?: string
  title: string
  subTitle: string
  introduction: string
  type: number
  area: string
  photoCover: string
  viewCount: number
  publisher: string
  publishTime: string
  isTop: boolean
  context: string
  files: string[]
}

export interface CreateOrEditNewsInput {
  id?: string
  title: string
  subTitle: string
  introduction: string
  type: number
  area: string
  photoCover: string
  viewCount: number
  publisher: string
  publishTime: string
  isTop: boolean
  context: string
  file: string[]
}
