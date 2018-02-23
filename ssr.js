/**
 * @file: ssr
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */

var documentTitle = require('react-document-title')
var style = require('react-document-style')

module.exports = function (gift) {
  var title = documentTitle.rewind()
  var cssText = style.rewind()

  return {
    title: title,
    css: cssText
  }
}

