<script lang="tsx">
import { defineComponent } from 'vue'

import type { PropType } from 'vue'

const props = {
  btnItem: {
    type: Object as PropType<ITableBtn>,
  },
  row: {
    type: Object,
  },
  index: {
    type: Number,
  },
  disable: {
    type: Boolean,
    default: false,
  },
}

export default defineComponent({
  props: props,
  setup(props, { emit }) {
    return () => {
      const { btnItem, row, disable } = props
      return (
        <el-button
          size="default"
          class={['el-button--text', btnItem.code]}
          link={false}
          disabled={disable ?? false}
          onClick={() => emit(btnItem.code, row)}
        >
          {btnItem.name}
        </el-button>
      )
    }
  },
})
</script>
