/**
 * Pagination Start
 */

declare type PageOutput<T> = {
  data: T[]
  pageModel: Pagination & { totalCount: number }
  objectData: unknown
}

declare type Pagination = {
  rows: number
  page: number
  orderInput?: OrderInput[]
  totalCount?: number
}

declare type PageInput = {
  pageModel: Pagination
}

declare enum OrderTypeEnum {
  Asc = 0,
  Desc = 1,
}

declare type OrderInput = {
  property: string
  order: OrderTypeEnum
}

declare type PageState = {
  pageInfo: {
    rows: number
    page: number
    total?: number
  }
}

/**
 * Pagination End
 */
