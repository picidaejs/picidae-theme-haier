# picidae-theme-haier
🍔 The universal picidae theme for project / library / framework etc.

[![build status](https://img.shields.io/travis/picidaejs/picidae-theme-haier/master.svg?style=flat-square)](https://travis-ci.org/picidaejs/picidae-theme-haier)
[![NPM version](https://img.shields.io/npm/v/picidae-theme-haier.svg?style=flat-square)](https://www.npmjs.com/package/picidae-theme-haier)
[![NPM Downloads](https://img.shields.io/npm/dm/picidae-theme-haier.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/picidae-theme-haier)

[Document check out here](https://picidaejs.github.io/picidae-theme-haier/)

## SSR
Haier supports picidae ssr and provides `title` and `css`.
We recommend the template html as follows:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--NOTE-->
  <title> {{ themeData.title }} </title>
  <link rel="stylesheet" href="{{ root }}style.css">
  <!--NOTE: link is ahead of style-->
  <style type="text/css"> {{ themeData.css | safe }} </style>
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

