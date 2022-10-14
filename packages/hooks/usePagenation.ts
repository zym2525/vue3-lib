import { reactive } from 'vue'

type PageState = {

}

export function usePagenation(getList) {
  const pageState = reactive<PageState>({
    pageInfo: {
      rows: 10,
      page: 1,
    },
  })

  const changePageOrPageSize = (pageIndex, pageSize) => {
    pageState.pageInfo.page = pageIndex
    pageState.pageInfo.rows = pageSize
    getList && getList(pageIndex)
  }

  return {
    pageState,
    changePageOrPageSize,
  }
}
