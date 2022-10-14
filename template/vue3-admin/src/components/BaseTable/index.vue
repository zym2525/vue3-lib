<template>
  <div
    class="table-wrapper"
    :style="{
      height: clientHeight - 119 - filterHeight + 'px',
    }"
  >
    <el-table
      v-if="data.length"
      ref="myTable"
      :data="data"
      :border="true"
      style="width: 100%"
      :max-height="clientHeight - 119 - 56 - filterHeight"
      highlight-current-row
      :header-cell-style="{
        background: 'rgb(245,247,250)',
        'text-align': 'center',
      }"
      :cell-style="setCellStyle"
      :row-key="getRowKey"
      @sort-change="handleSortChange"
    >
      <base-table-seq :rows="pagination.rows" :page="pagination.page" />
      <el-table-column
        v-for="item in tableCol"
        :key="item.id"
        :prop="item.code"
        :label="item.name"
        :min-width="item.width || 200"
        :show-overflow-tooltip="showOverflow"
        :fixed="setFixed(item.code)"
        :sortable="sortableCol.includes(item.code) ? 'custom' : false"
      >
        <template v-slot="scope">
          <slot
            name="dispalyslot"
            v-bind="{
              data: scope.row,
              column: scope.column.property,
            }"
          />
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        :label="operationLabel"
        :width="maxOperationWidth"
        v-if="tableBtn.length"
      >
        <template v-slot="scope">
          <slot
            name="operatslot"
            v-bind="{
              data: scope.row,
              btns: tableBtn,
            }"
          />
        </template>
      </el-table-column>
    </el-table>

    <div v-if="pagination.total > 0" class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      />
    </div>

    <NoData v-if="pagination.total === 0" type="data" />
  </div>
</template>

<script lang="ts">
import BaseTableSeq from './BaseTableSeq.vue'
import { storeToRefs } from 'pinia'
import NoData from '@/components/NoData/index.vue'
import { defineComponent, reactive, toRefs, PropType, watch, onMounted } from 'vue'
import { useAppStore } from '@/store/modules/app'

export default defineComponent({
  name: 'BaseTable',
  components: { BaseTableSeq, NoData },

  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },

    pagination: {
      type: Object as PropType<{ rows: number; page: number; total?: number }>,
      default: () => ({
        rows: 10,
        page: 1,
        total: -1,
      }),
    },

    tableCol: {
      type: Array as PropType<Array<ITableCol>>,
      default: () => [],
      required: true,
    },

    tableFixed: {
      type: Array as PropType<Array<{ code: string }>>,
      default: () => [],
    },

    tableBtn: {
      type: Array as PropType<Array<ITableBtn>>,
      default: () => [],
    },

    sortableCol: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },

    operationLabel: {
      type: String,
      default: '操作',
    },

    rowKey: {
      type: String,
      default: 'id',
    },

    showOverflow: {
      type: Boolean,
      default: true,
    },

    maxOperationWidth: {
      type: Number,
      default: 100,
    },
  },

  emits: ['sortChange', 'changePage'],

  setup(props, { emit }) {
    const state = reactive({
      filterHeight: 0,
      loading: false,

      currentPage: props.pagination.page,
      pageSize: props.pagination.rows,
    })

    const app = useAppStore()

    const { clientWidth, clientHeight } = storeToRefs(app)

    watch([clientWidth, clientHeight], ([_newWidth, _newHeight], [_oldWidth, _oldHeight]) => {
      if (document.querySelector('.filter-wrapper')) {
        let node = document.querySelectorAll('.filter-wrapper')
        let current = node[node.length - 1]
        state.filterHeight = current.clientHeight
        node = null
        current = null
      }
    })

    onMounted(() => {
      if (document.querySelector('.filter-wrapper')) {
        let node = document.querySelectorAll('.filter-wrapper')
        let current = node[node.length - 1]

        state.filterHeight = current.clientHeight
        node = null
        current = null
      }
    })

    watch(
      () => state.currentPage,
      (newValue, _oldValue) => {
        emit('changePage', newValue, state.pageSize)
      }
    )

    watch(
      () => state.pageSize,
      (newValue, _oldValue) => {
        state.currentPage = 1
        emit('changePage', 1, newValue)
      }
    )

    const setFixed = (column) => {
      const { tableFixed } = props
      return tableFixed[column] ? tableFixed[column] : false
    }

    const setCellStyle = ({ _row, column, _rowIndex, _columnIndex }) => {
      const hitItem = props.tableCol.find((x) => x.name === column.property)

      if (hitItem?.isMoney) {
        return { 'text-align': 'right' }
      } else {
        return { 'text-align': 'center' }
      }
    }

    // 保存选中的数据id,row-key就是要指定一个key标识这一行的数据
    const getRowKey = (row) => {
      const { rowKey } = props
      return row[rowKey]
    }

    const handleSortChange = ({ _column, prop, order }) => {
      emit('sortChange', prop, order)
    }

    return {
      ...toRefs(state),
      props,
      clientWidth,
      clientHeight,
      setFixed,
      setCellStyle,
      getRowKey,
      handleSortChange,
    }
  },
})
</script>

<style scoped lang="scss">
.table-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: calc(100% - 20px);
  flex-direction: column;
}
.pagination-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
</style>
