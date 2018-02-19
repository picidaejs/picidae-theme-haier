---
title: "环境安装"
order: 1
---

下面的操作依赖于 `Node.js`，再进行下面的操作之前请确保你已经安装 Node.js 版本
推荐使用最新的 Node.js 版本。

<toc>

---

## 安装 Picidae

### 全局安装
```bash
npm install picidae --global
# 或者
yarn global add picidae 
```

## 初始化项目

```bash
picidae init my-docs
cd my-docs
# 本地安装 picidae 和 Haier
npm install picidae picidae-theme-haier --save # 更推荐
# 或者全局安装 Haier
picidae use picidae-theme-haier
```

### 修改 picidae 配置

完成了上面的步骤后，可以看到 `my-docs` 目录下，产生了 `picidae.config.js` 配置文件。  
下面将 picidae 配置中使用的主题修改为 Haier
```javascript
// picidae.config.js
module.exports = {
  theme: 'picidae-theme-haier',
  docRoot: './docs',
  port: 9999
}
```
