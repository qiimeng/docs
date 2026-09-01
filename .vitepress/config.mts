import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "启梦主题官方文档",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'WordPress教程', link: '/docs/wordpress/index.md' },
      { text: 'Typecho教程', link: '/docs/typecho/index.md' }
    ],

    sidebar: {
      // 当用户访问 /docs/typecho/ 时显示此侧边栏
      '/docs/typecho/': [
        {
          text: 'Typecho 教程',
          items: [
            { text: 'Index', link: '/docs/typecho/index' }
          ]
        }
      ],

      // 当用户访问 /docs/wordpress/ 时显示此侧边栏
      // 已修改为多个独立分组（每个分组都是一个“大标题”）
      '/docs/wordpress/': [
        {
          text: '关于启梦主题',
          items: [
            { text: '介绍', link: '/docs/wordpress/index.md' },   // 请替换为实际链接
            { text: '开发团队', link: '/docs/wordpress/about.md' },
            { text: '更新日志', link: '' },
          ]
        },
        {
          text: '安装教程',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '外观设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '基础外观', link: '/docs/wordpress/外观设置/Basap.md' },  // 请替换为实际链接
            { text: '移动端设置', link: '/docs/wordpress/外观设置/MobSet.md' },
            { text: '多语言设置', link: '/docs/wordpress/外观设置/Language.md' },
            { text: '页脚设置', link: '/docs/wordpress/外观设置/foset.md' }
          ]
        },
        {
          text: '首页设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '首页布局', link: '/docs/wordpress/首页设置/Hpl.md' },  // 请替换为实际链接
            { text: '图片广告设置', link: '/docs/wordpress/首页设置/Imgad.md' },
            { text: '卡片模块', link: '/docs/wordpress/首页设置/Carmod.md' },
            { text: '幻灯片叠加模组', link: '/docs/wordpress/首页设置/slicom.md' }
          ]
        },
        {
          text: '内容设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '社区设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '用户设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '客服设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '交易营销',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '积分商城',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: 'AI设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '系统设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '授权设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: 'SEO设置',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '网站统计',
          collapsed: true,                // 子项可折叠
          items: [
            { text: '宝塔安装教程', link: '' }   // 请替换为实际链接
          ]
        },
        {
          text: '主题备份',
          collapsed: true,
          items: [
            { text: '基础外观', link: '' }
          ]   // 闭合 items 数组
        }     // 闭合该分组对象
      ]       // 闭合 '/docs/wordpress/' 数组
    },// 闭合 sidebar 对象（注意这里有逗号，因为后面还有 socialLinks）

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
