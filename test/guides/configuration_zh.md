---
title: "配置说明"
order: 3
---

<TOC>
---

### `defaultLang`
_==string==_ `'en' | 'zh'` (默认: `'en'`)
当为`'en'`时，页面默认语言是英文，文档中对应的关系为:  
`abc.md` 对应英文，`abc_zh.md` 对应中文
 
当为`'en'`时，页面默认语言是中文，文档中对应的关系为:  
`abc.md` 对应中文，`abc_en.md` 对应英文


### `logo`
_==Object==_
- `src` _==string==_ Logo 图像的来源 (_可选_，默认: `undefined`)
- `name` _==string==_ Logo 名字 (默认: `Haier`)

### `description`
_==string==_ 用于首页标题的描述。  
_可选_，默认：`"🍔 The universal picidae theme for project / library / framework etc."`

### `headers`
_<mark>[string | Object]</mark>_ 主题头部导航渲染的配置

string 类型对应预设的一些特定类型的导航，如 `docs/api/help/i18n/search/github`  
Object 类型数据结构形为
```js
{
  // 当 ii8n 为空时，导航的内容将以 name 为准
  name: 'Get Started',
  // 如果需要设置不同语言环境下的导航名
  // 可以设置 i18n
  i18n: {
    en: 'Get Started',
    zh: '开始使用'
  },
  // 点击导航将跳转的 url
  // 注意：这里只需要设置英文环境下的 url
  //      Haier 将会根据语言环境自动转换
  url: '/guides/installation'
}
```

默认为：
```js
[
  {
    i18n: {
      en: 'Get Started',
      zh: '开始使用'
    },
    url: '/guides/installation'
  },
  'help',
  {
    name: 'Example',
    i18n: {
      en: 'Example',
      zh: '栗子'
    },
    url: '/example'
  },
  'i18n', 'search', 'github'
]
```

### `repository`
_==Object | string==_

该配置用于控制 [`headers`](#headers) 中的 `github` 导航跳转链接和文档页面的编辑按钮的跳转链接
_==Object==_
- repo _==string==_ github 仓库地址  
  例子：`"https://github.com/picidaejs/picidae-theme-haier"` 或者 `"picidaejs/picidae-theme-haier"`
- branch _==string==_ 仓库分支，默认`"master"`
- prefix _==string==_ 前缀字符串，用于拼接编辑链接，默认为空

### `search`
_==Object==_  
基于 [docsearch](https://github.com/algolia/docsearch) 搜索文档
- apiKey _==string==_ 查看 docsearch 配置
- indexName _==string==_ 查看 docsearch 配置

### `style`
_==Object==_  
自定义样式定义，默认值:  
- copyrightColor _==string==_ 版权信息文字颜色，（默认 `"rgba(255, 255, 255, .4)"`）
- footerBgColor _==string==_ 底部背景颜色，（默认 `"#808080"`）
- themeColor _==string==_ 主题主颜色，（默认 `"#218080"`）
- loadingColor _==string==_ 若loadingColor为空，则为 themeColor 的对比色，（默认 `"#dd2f3d"`）
- bodyColor _==string==_ 主题文字颜色，（默认 `"#393939"`）

### `footer`
_==Object==_  
配置底部信息
- organization _==Object==_ 组织相关配置
  - to _==string==_ 默认 `"https://github.com/picidaejs/picidaejs"`
  - logo _==string==_ 默认 `"https://github.com/picidaejs/picidaejs/raw/master/logo/picidae-2x.png"`
- copyright _==string==_ 版权信息，可以为 html 格式 `"Copyright © 2018 - Built by Picidae"`
