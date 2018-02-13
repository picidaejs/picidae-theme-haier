---
title: "开始写文档"
order: 2
---

<toc>
---
由于[上一节](./installation_zh.md)中 picidae 配置文件中将 `docRoot` 设置为 ./docs，即为 `my-docs/docs` 目录，那么我们就开始在目录下书写我们的文档吧！
首先建立如下结构的文档集合：
```text
docs/
├── api/
│   ├── __information__.md
│   ├── hello-haier_zh.md
│   └── hello-haier.md
├── help_zh.md
├── help.md
├── index_zh.md
└── index.md
```

那么各文件的对应关系是如何的呢？介绍之前我们现需要了解一下 yaml-front 的文本格式，
之前使用过 Hexo 写博客的同学肯定就比较熟悉了，那么可以直接跳过这里了。

## Yaml Front
yarm front 意思就是 yaml 前置，那么 yaml 是什么呢？  
yaml 是一种数据结构的文件格式，如我们需要表达一个 title 为 `hello` 的数据结构，
在 JSON 中是
```json
{ "title": "hello" }
```
而用 yaml 表示则为
```yaml
title: hello
```
除了上面的简单的数据结构以外，yaml 用来表示嵌套复杂的数据结构也是十分给力的！  
了解 Yaml Front 之后，下面详细介绍各文件的对应关系

## 文件路由对应
如下表格：

| 文件 | 对应路径 | 描述 |
| -- | --- | --- |
| index.md | / | 英文首页渲染的 md |
| index_zh.md | /index_zh | 中文首页 |
| help.md | /help | 英文帮助页面，支持的 Yaml Front 有 title（用于 document title） |
| help_zh.md | /help_zh | 同上逻辑 |
| api/hello-haier.md | /api/hello-haier | 英文环境下的 API 文档，支持 title（对应页面标题），order（同级排序序号，从小到大）|
| api/hello-haier_zh.md | /api/hello-haier_zh | 同上，中文环境 |

其中，`api/hello-haier.md` 中的支持的 yaml-front order 数据，表示的是同级文档下的排序关系，
如还存在文档 `api/hello-picidae.md`，那么页面上渲染的相对顺序是按照 order 来渲染的（从小到大）。

噢对了，还有 `api/__information__.md` 文件，该文件不同于其他 markdown 文档，
它是用来控制菜单中的中英文标题，和控制与不同组文档的相对顺序的（从小到大）。

```yaml
# api/__information__.md
# 英文标题
title: "Get Stated"
# 中文标题
title_zh: "开始使用"
order: 1
```
