import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
  lang: "zh-CN",
  title: "操作文档",
  description: "Vite & Vue powered static site generator.",

  lastUpdated: true,
  cleanUrls: "without-subfolders",

  markdown: {
    headers: {
      level: [0, 0],
    },
  },

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": sidebarGuide(),
      "/config/": sidebarConfig(),
    },

    // editLink: {
    //   pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    //   text: "Edit this page on GitHub",
    // },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },

    // algolia: {
    //   appId: "8J64VVRP8K",
    //   apiKey: "a18e2f4cc5665f6602c5631fd868adfd",
    //   indexName: "vitepress",
    // },

    // carbonAds: {
    //   code: "CEBDT27Y",
    //   placement: "vuejsorg",
    // },
  },
});

function nav() {
  return [
    {
      text: "指南",
      link: "/guide/directory-structure",
      activeMatch: "/guide/",
    },
    { text: "Configs", link: "/config/introduction", activeMatch: "/config/" },
    {
      text: version,
      items: [
        {
          text: "Changelog",
          link: "https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md",
        },
        {
          text: "Contributing",
          link: "https://github.com/vuejs/vitepress/blob/main/.github/contributing.md",
        },
      ],
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "指南",
      collapsible: true,
      items: [
        { text: "目录结构", link: "/guide/directory-structure" },
        { text: "文件命名规范", link: "/guide/directory-name-rule" },
        { text: "scss代码规范", link: "/guide/scss-rule" },
        { text: "vue代码规范", link: "/guide/vue-code-rule" },
      ],
    },
  ];
}

function sidebarConfig() {
  return [
    {
      text: "Config",
      items: [
        { text: "Introduction", link: "/config/introduction" },
        { text: "App Configs", link: "/config/app-configs" },
        { text: "Theme Configs", link: "/config/theme-configs" },
        { text: "Frontmatter Configs", link: "/config/frontmatter-configs" },
      ],
    },
  ];
}
