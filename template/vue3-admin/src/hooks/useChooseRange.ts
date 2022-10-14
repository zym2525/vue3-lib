import { format } from '@/utils/common/common'
import { computed, ref } from 'vue'

export function useChooseRange(formatStr = 'YYYY-MM-DD') {
  const chooseRange = ref('')
  const startTime = computed(() => {
    if (chooseRange.value?.length) {
      return format(chooseRange.value[0], formatStr)
    }
    return ''
  })

  const endTime = computed(() => {
    if (chooseRange.value?.length) {
      return format(chooseRange.value[1], formatStr)
    }
    return ''
  })

  return {
    chooseRange,
    startTime,
    endTime,
  }
}
