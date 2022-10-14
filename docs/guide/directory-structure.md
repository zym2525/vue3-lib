---
nav:
  title: 指南
  path: /guides
---

# 目录结构

```

├── build                             # 构建工具
├── mock                              # 项目mock 模拟数据
├── public                            # 静态资源
├── src                               # 源代码
│   ├── api                           # 所有请求
│   ├── assets                        # 主题 字体等静态资源
│   ├── components                    # 全局公用组件
│   ├── constants                     # 全局常量
│   ├── directive                     # 全局指令
│   ├── hooks                         # 全局 hooks
│   ├── layout                        # 全局 layout
│   ├── router                        # 路由
│   ├── store                         # 全局 store管理
│   ├── styles                        # 全局样式
│   ├── utils                         # 全局公用方法
│   ├── views                         # views 所有页面
│   ├── App.vue                       # 入口页面
│   ├── main.ts                       # 入口文件 加载组件 初始化等
│   └── permission.ts                 # 权限管理
├── types                             # 全局typescript
├── tests                             # 测试
├── .env.xxx                          # 环境变量配置
├── .eslintrc.js                      # eslint 配置项
├── babel.config.js                   # babel-loader 配置
├── vite.config.js                    # vite 配置
├── postcss.config.js                 # postcss 配置
└── package.json                      # package.json

```

## assets结构
```
│   ...
|   |  
│   ├── assets                        # 主题 字体等静态资源
│   │   ├── [module]                  # 模块名称 
│   │   │    ├── *.png,.gif等         # 该模块下的图片
│   │   ├── *.png,.gif等              # 全局图片
|   |
│   ...

```
[文件命名规范](/guide/directory-name-rule#assets命名规范)


## components结构

```

│   ...
│   ├── components                    # 全局公用组件
│   │   ├── [component]               # 组件文件夹
│   │   │    ├── [component].vue      # 具体组件文件
│   │   ├── index.ts                  # 总的components导出文件
│   ...

```
[文件命名规范](/guide/directory-name-rule#components命名规范)

## utils结构

```

│   ...
│   ├── utils                         # 全局公用方法
│   │   ├── common                    # 公用方法
│   │   │    ├── common.ts            # 公用小方法存放文件
│   │   │    ├── [util].ts            # 单个公共方法文件(如: oss,download等)
│   │   │    ├── index.ts             # 总的common导出文件
│   │   ├── [utilstype]               # 公用方法(如: storage)
│   │   │    ├── [util].ts            # 单个方法文件(如: auth等)
│   │   │    ├── index.ts             # 总的导出文件
│   │   ├── index.ts                  # 总的utils导出文件
│   ...

```

## views结构

```

│   ...
│   ├── views                         # views 所有页面
│   │   ├── [module]                  # 模块名称 
│   │   │    ├── components           # 只在该模块下面使用的公共组件或是一些小的微件(如: Button,ListItem等)
│   │   │    ├── hooks                # 只在该模块下面使用的hooks
│   │   │    │── [page].vue           # 页面名称 
│   ...

```
[文件命名规范](/guide/directory-name-rule#views命名规范)