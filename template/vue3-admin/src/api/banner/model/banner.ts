export interface BannerListWithPageInput extends PageInput {
  positionType?: number
  turnType?: number
  beginTime?: string
  endTime?: string
}
export interface IBanner {
  id?: string
  positionType: number
  turnType: number
  turnId: string
  url: string
  beginTime: string
  endTime: string
  sort: number
  creationTime: string
}
