/**
 * @file: ssr
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */

var documentTitle = require('react-document-title')

module.exports = function (gift) {
  var themeConfig = gift.themeConfig
  var title = documentTitle.rewind()

  return {
    title: title
  }
}

