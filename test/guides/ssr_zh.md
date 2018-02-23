---
title: "服务端渲染"
order: 4
---

<TOC>
---

Haier 支持 Picidae 主题服务器渲染，提供 `title` 和 `css` 数据用于渲染。
推荐使用的 HTML 模板如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--注意-->
  <title> {{ themeData.title }} </title>
  <!--注意-->
  <style type="text/css"> {{ themeData.css }} </style>
  <link rel="stylesheet" href="{{ root }}style.css">
</head>
<body>
<div id="root">
  {{ content | safe }}
</div>
<script src="{{ root }}PICIDAE_COMMON.js"></script>
<script src="{{ root }}PICIDAE_ENTRY.js"></script>
</body>
</html>
```
