/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
const set = {
  zh: require('./zh-CN'),
  en: require('./en-US')
}
let lang = 'en'
export function switchLang(l) {
  lang = l
}
export function getLang() {
  return lang
}
export function exists(key) {
  return key in set[lang]
}

global.__ = function (key) {
  if (!set[lang]) {
    throw new Error('language: ' + lang + ' not support')
  }
  return set[lang][key] || `{{${key}}}`
}
