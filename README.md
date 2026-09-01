# 启梦主题官方文档

基于 [VitePress](https://vitepress.dev) 构建的「启梦主题」官方文档站，提供 WordPress / Typecho 主题的安装、外观、首页、内容、社区等模块的使用教程。

## ✨ 功能特性

- 📚 **VitePress 文档站**：Markdown 编写，开箱即用的搜索、导航、侧边栏
- 🎨 **自定义主题**：蓝色品牌色、首页 hero 居中布局、团队介绍页
- 🖼️ **全站图片灯箱**：点击文档中任意图片即可全屏预览
  - 上一张 / 下一张切换、键盘方向键（`←` `→`）、`Esc` 关闭
  - 滚轮 / 双击缩放、拖拽平移、移动端双指缩放与滑动切换
- ☁️ **阿里云 ESA Pages 部署**：内置 `esa.jsonc` 构建配置

## 🛠️ 技术栈

| 项 | 说明 |
| --- | --- |
| [VitePress](https://vitepress.dev) | `^2.0.0-alpha.19` |
| [Vite](https://vite.dev) | 由 VitePress 内置（v8.x） |
| Node.js | 建议 ≥ 20 |

## 📁 目录结构

```text
qiimeng-docs-new/
├── .vitepress/
│   ├── config.mts              # 站点配置（导航、侧边栏等）
│   ├── theme/                  # 自定义主题
│   │   ├── index.ts            # 主题入口（注册灯箱、样式）
│   │   ├── lightbox.ts         # 全站图片灯箱逻辑（零依赖）
│   │   └── style/
│   │       ├── var.css         # 品牌色等 CSS 变量
│   │       ├── style.css       # 全局样式微调
│   │       └── lightbox.css    # 灯箱样式
│   └── cache/                  # Vite 依赖预构建缓存（可忽略）
├── docs/
│   ├── wordpress/              # WordPress 教程
│   │   ├── index.md
│   │   ├── about.md            # 团队介绍页
│   │   ├── 外观设置/           # 外观设置文档
│   │   ├── 首页设置/           # 首页设置文档
│   │   └── img/                # 文档图片
│   └── typecho/                # Typecho 教程
├── public/                     # 静态资源（qimeng.png）
├── index.md                    # 首页（layout: home）
├── package.json
└── esa.jsonc                   # 阿里云 ESA Pages 部署配置
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发（热更新）
npm run docs:dev

# 构建生产版本（输出到 .vitepress/dist）
npm run docs:build

# 本地预览构建产物
npm run docs:preview
```

开发服务器默认运行在 `http://localhost:5173`，预览服务器默认运行在 `http://localhost:4173`。

## ☁️ 部署

### 阿里云 ESA Pages

仓库根目录已提供 `esa.jsonc`：

```jsonc
{
  "installCommand": "npm install",
  "buildCommand": "npm run docs:build",
  "assets": {
    "directory": "./.vitepress/dist",
    "notFoundStrategy": "404Page"
  }
}
```

在 ESA Pages 控制台关联本仓库即可自动构建部署。

### 其他平台（GitHub Pages / Netlify / Vercel）

构建命令：`npm run docs:build`，发布目录：`.vitepress/dist`。

## ✍️ 编写文档

1. 在 `docs/` 下按模块创建或编辑 Markdown 文件（如 `docs/wordpress/首页设置/公告模块.md`）
2. 图片放在与文档同级的 `img/` 或 `image/` 子目录中，用相对路径引用：
   ```md
   ![图片说明](img/示例.png)
   ```
3. 在 `.vitepress/config.mts` 的 `sidebar` 中添加对应侧边栏链接
4. 文档中任意图片点击后会自动全屏预览，无需额外配置

> ⚠️ 注意：文档引用的图片必须真实存在，否则 `npm run docs:build` 会因无法解析图片而构建失败。若某张图暂时缺失，可用 `<!-- 图片缺失: 路径 -->` 注释占位。

## 🖼️ 图片灯箱说明

灯箱通过 `.vitepress/theme/lightbox.ts` 实现，**零第三方依赖**：

- 全局事件委托监听 `.vp-doc` 内的图片点击，路由切换后自动生效，无需改 Markdown
- 需要排除某张图片时，给它加 `data-lightbox-ignore` 属性即可
- 链接内图片、代码块内图片默认不触发灯箱

## 🔧 常见问题

**Q：构建时报 `Could not resolve './img/xxx.png'`？**
A：图片路径写错了或文件不存在。检查 Markdown 中相对路径与文件实际位置是否一致。

**Q：提交时出现大量 `LF will be replaced by CRLF` 警告？**
A：这是 Windows 下行尾转换提示，无害。仓库已通过 `.gitattributes`（`* text=auto`）规范化，新提交不会再产生该警告。

## 📄 License

本项目文档内容归启梦主题团队所有，仅供学习与参考。
