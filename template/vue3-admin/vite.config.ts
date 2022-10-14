import { resolve } from 'path'
import { warpperEnv } from './build'
import { getPluginsList } from './build/plugins'
import { UserConfigExport, ConfigEnv, loadEnv, AliasOptions } from 'vite'

export const projRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const coreRoot = resolve(pkgRoot, 'core')

// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd()

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: AliasOptions = [
  {
    find: '@',
    replacement: pathResolve('src'),
  },
  {
    find: '@build',
    replacement: pathResolve('build'),
  },
  {
    find: /^@bole-core\/(.*)$/,
    replacement: `${pkgRoot}/$1`,
  },
]

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_LEGACY, VITE_PUBLIC_PATH, VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } =
    warpperEnv(loadEnv(mode, root))

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     additionalData: `@use "@/style/element/index.scss" as *;`,
      //   },
      // },
      // https://github.com/vitejs/vite/issues/5833
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: '0.0.0.0',
      // 本地跨域代理
      proxy:
        VITE_PROXY_DOMAIN_REAL.length > 0
          ? {
            [VITE_PROXY_DOMAIN]: {
              target: VITE_PROXY_DOMAIN_REAL,
              // ws: true,
              changeOrigin: true,
              //rewrite: (path: string) => regExps(path, VITE_PROXY_DOMAIN)
            },
          }
          : {},
    },
    plugins: getPluginsList(command, VITE_LEGACY),
    build: {
      sourcemap: false,
      // brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  }
}
