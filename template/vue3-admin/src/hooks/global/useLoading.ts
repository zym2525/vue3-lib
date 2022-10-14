import { ElLoading } from 'element-plus'

export function useLoading(config?: { text: string; background?: string }) {
  return new Promise<() => void>((resolve, _reject) => {
    const loading = ElLoading.service({
      lock: true,
      text: config?.text ?? '加载中',
      background: config?.background ?? 'rgba(0, 0, 0, 0)',
    })

    resolve(() => {
      loading.close()
    })
  })
}
