import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

import removeConsole from 'vite-plugin-remove-console'

import { viteBuildInfo } from './info'

import liveReload from 'vite-plugin-live-reload'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // 把svg 打包放一起

import svgLoader from 'vite-svg-loader' // svg?component

import legacy from '@vitejs/plugin-legacy'

import { visualizer } from 'rollup-plugin-visualizer'

import { createHtmlPlugin } from 'vite-plugin-html'

// import ElementPlus from 'unplugin-element-plus/vite'

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import DefineOptions from 'unplugin-vue-define-options/vite'

import path from 'path'

import { Title } from '../public/serverConfig.json'
import { ConfigEnv } from 'vite'
import * as hooks from '../src/hooks/global'

export function getPluginsList(command: ConfigEnv['command'], VITE_LEGACY: ViteEnv['VITE_LEGACY']) {
  // const prodMock = true;
  const lifecycle = process.env.npm_lifecycle_event
  console.log(lifecycle)

  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),

    // https://github.com/vbenjs/vite-plugin-html/tree/main#readme
    createHtmlPlugin({
      minify: true,
      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: Title,
        },
      },
    }),

    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'pinia',
        'vue-router',
        {
          '@/hooks/global': Object.keys(hooks),
        },
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    DefineOptions(),

    // 线上环境删除console
    removeConsole(),
    // buildInfo terminal output
    viteBuildInfo(),
    // 修改layout文件夹下的文件时自动重载浏览器
    liveReload(['src/layout/**/*', 'src/router/**/*']),

    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgIcons/')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      /**
       * custom insert position
       * inject?: 'body-last' | 'body-first'
       * @default: body-last
       */
      inject: 'body-last',

      /**
       * custom dom id
       * customDomId: '__svg__icons__dom__',
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),

    // svg组件化支持
    svgLoader(),

    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
        // {
        //   libraryName: 'ant-design-vue',
        //   esModule: true,
        //   resolveStyle: (name) => {
        //     return `ant-design-vue/es/${name}/style/index`
        //   },
        // },
      ],
    }),

    // AutoImport({
    //   resolvers: [
    //     // Auto import icon components
    //     // 自动导入图标组件
    //     IconsResolver({
    //       prefix: 'Icon',
    //     }),
    //   ],
    // }),

    // Components({
    //   resolvers: [
    //     // Auto register icon components
    //     // 自动注册图标组件
    //     IconsResolver({
    //       enabledCollections: ['ep'],
    //     }),
    //   ],
    // }),

    // Icons({
    //   autoInstall: true,
    // }),

    // 是否为打包后的文件提供传统浏览器兼容性支持
    VITE_LEGACY
      ? legacy({
          targets: ['ie >= 11'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        })
      : null,
    // 打包分析
    lifecycle === 'report'
      ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
      : null,
  ]
}
