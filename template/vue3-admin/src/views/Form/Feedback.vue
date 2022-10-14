<template>
  <div class="app-container">
    <div class="filter-wrapper">
      <div class="filter-list">
        <div class="filter-list-item">
          <el-input
            v-model="state.queryCondition"
            placeholder="姓名/电话/邮箱/问题详情"
            @keyup.enter="getList()"
          />
        </div>

        <div class="filter-list-item">
          <span>提交时间：</span>
          <el-date-picker
            v-model="chooseRange"
            type="daterange"
            start-placeholder="开始时间"
            range-separator="至"
            end-placeholder="结束时间"
            style="width: 240px"
          />
        </div>
      </div>

      <div class="search-btn-wrapper">
        <el-button type="primary" @click="getList()"> 查询 </el-button>
        <el-button type="primary" @click="handerExport()"> 数据导出 </el-button>
      </div>
    </div>

    <TableData
      :data="state.dataList"
      :pagination="pageState.pageInfo"
      :table-col="state.tableCol"
      :table-btn="state.tableBtn"
      @change-page="changePageOrPageSize"
      :row-key="'id'"
    >
      <template v-slot:dispalyslot="{ data, column }"> {{ data[column] }} </template>

      <template #operatslot="{ data, btns }">
        <template v-for="btnItem in btns">
          <template v-if="btnItem.code == 'detail'">
            <OperationBtn
              :key="btnItem.id"
              :btn-item="btnItem"
              :row="data"
              @detail="handleDetial"
            />
          </template>
        </template>
      </template>
    </TableData>
  </div>
</template>

<script lang="ts" setup>
import OperationBtn from '@/components/OperationBtn/index.vue'
import TableData from '@/components/BaseTable/index.vue'
import { getProblemFeedbackList, exportProblemFeedbacks } from '@/api/official'
import type {
  IProblemFeedback,
  ProblemFeedbacksListInput,
  ProblemFeedbacksListWithPageInput,
} from '@/api/official/model/official'
import { useChooseRange } from '@/hooks/useChooseRange'
import { format, downloadFile } from '@/utils'

const { chooseRange, startTime, endTime } = useChooseRange()

const state = reactive<{
  dataList: IProblemFeedback[]
  tableCol: ITableCol[]
  tableBtn: ITableBtn[]
  queryCondition: string
}>({
  dataList: [],
  tableCol: [
    {
      id: 'feedback_001',
      code: 'problemDesc',
      name: '问题详情',
    },
    {
      id: 'feedback_002',
      code: 'name',
      name: '姓名',
    },
    {
      id: 'feedback_003',
      code: 'contactPhone',
      name: '电话',
    },
    {
      id: 'feedback_004',
      code: 'isRead',
      name: '是否已读',
    },
    {
      id: 'feedback_005',
      code: 'email',
      name: '邮箱',
    },
    {
      id: 'feedback_006',
      code: 'creationTime',
      name: '提交时间',
    },
  ],
  tableBtn: [
    {
      code: 'detail',
      name: '详情',
    },
  ],

  queryCondition: '',
})

onMounted(() => {
  getList()
})

const getList = () => {
  try {
    const params: ProblemFeedbacksListWithPageInput = {
      pageModel: {
        rows: pageState.pageInfo.rows,
        page: pageState.pageInfo.page,
        orderInput: [
          {
            property: 'creationTime',
            order: 1,
          },
        ],
      },
      queryCondition: state.queryCondition,
      startTime: startTime.value,
      endTime: endTime.value,
    }

    useLoading().then((loadingClose) => {
      getProblemFeedbackList(params)
        .then((res) => {
          pageState.pageInfo.total = res.pageModel.totalCount

          state.dataList = res.data.map((x) => {
            x.isRead = x.isRead ? '已读' : '未读'
            x.creationTime = format(x.creationTime)
            return x
          })
          loadingClose && loadingClose()
        })
        .catch(() => {
          loadingClose && loadingClose()
        })
    })
  } catch (error) {
    console.log(error)
  }
}
const { pageState, changePageOrPageSize } = usePagenation(getList) // 注意代码顺序

const handerExport = () => {
  const params: ProblemFeedbacksListInput = {
    queryCondition: state.queryCondition,
    startTime: startTime.value,
    endTime: endTime.value,
  }

  useLoading({ text: '请求中' }).then(async (loadingClose) => {
    const res = await exportProblemFeedbacks(params)
    downloadFile(res, '问题反馈', 'xlsx')
    loadingClose && loadingClose()
  })
  // exportToXLSX<IProblemFeedbackTemplate>(res, '问题反馈', {
  //   name: '姓名',
  //   contactPhone: '电话',
  //   email: '邮箱',
  //   problemDesc: '问题详情',
  //   isRead: '是否阅读',
  //   creationTime: '提交时间',
  // })
}

const handleDetial = (item) => {
  console.log(item)
}

defineOptions({
  name: 'Feedback',
})
</script>

<style scoped lang="scss"></style>
