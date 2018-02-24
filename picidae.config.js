/**
 * @file: picidae.config.js
 * @author: Cuttle Cong
 * @date: 2018/2/9
 * @description:
 */

module.exports = {
  docRoot: './test',
  theme: './',
  port: 10000,
  publicPath: '/picidae-theme-haier/',
  // publicPath: '/',
  verbose: false,
  transformers: [
    'picidae-transformer-toc?force=false&test=<toc>',
    'picidae-transformer-file-syntax',
    // 'picidae-transformer-file-syntax',
    // 'mark',
    'remark-mark'
  ]
}
