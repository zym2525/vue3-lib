export interface ShortlistListWithPageInput extends PageInput {
  itemName: string
}
export interface IShortlist {
  id: string
  itemName: string
  creatorName: string
  creationTime: string
}

export interface CreateOrEditShortlistInput {
  id?: string
  itemName: string
  creatorName: string
}
