---
title: "Server Side Render"
order: 4
---

<TOC>
---

Haier supports picidae ssr and provides `title` and `css`.
We recommend the template html as follows.

```text
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--NOTE-->
  <title> {{ themeData.title }} </title>
  <!--NOTE-->
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

