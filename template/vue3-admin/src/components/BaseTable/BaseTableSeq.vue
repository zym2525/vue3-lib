<template>
  <el-table-column
    type="index"
    label="序号"
    width="72"
    :align="'center'"
    :index="setIndex"
    :fixed="fixed"
  />
</template>

<script lang="tsx">
const props = {
  index: {
    type: Number,
  },
  rows: {
    type: Number,
  },
  page: {
    type: Number,
  },
  fixed: {
    type: [String, Boolean],
  },
}
export default {
  name: 'BaseTableSeq',
  props: props,
  emits: [],
  setup(props) {
    const setIndex = (index) => {
      const { rows, page } = props
      return rows * (page - 1) + index + 1
    }

    return {
      setIndex,
    }
  },
}
</script>
