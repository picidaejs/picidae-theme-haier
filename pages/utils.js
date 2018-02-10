/**
 * @file: utils
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import url from 'url'
import nps from 'path'
import React from 'picidae/exports/react'
import { Link } from 'picidae/exports/react-router'
import { getLang } from './locale/index'

exports.getLangByPath = function (pathname = '') {
  if (/_zh\s*$/.test(pathname)) {
    return 'zh'
  }
  return 'en'
}

exports.getPathFromLang = function (lang = 'en', prevPath) {
  if (lang === 'en') {
    return prevPath.replace(/_zh\s*$/, '')
  }
  if (prevPath === '' || prevPath === '/') {
    prevPath = 'index'
  }
  // lang === 'zh'
  return prevPath.replace(/_zh\s*$/, '')
                 .replace(/\/+$/, '') + '_zh'
}


export function filterLangDocs(docs = []) {
  if (getLang() === 'en') {
    return docs.filter(d => !d._key.endsWith('_zh'))
  }

  return docs.filter(d => d._key.endsWith('_zh'))
}

exports.injectScript = function (src, callback) {
  const script = document.createElement('script')
  script.src = src
  script.onload = function () {
    callback && callback(null)
  }
  script.onerror = function (error) {
    callback && callback(error)
  }
}

exports.injectStyle = function (src, callback) {
  const link = document.createElement('link')
  link.href = src
  link.ref = 'stylesheet'
  link.onload = function () {
    callback && callback(null)
  }
  link.onerror = function (error) {
    callback && callback(error)
  }
}

export function parseGithubRepo(repository, xpath) {
  function parse(repo, branch, prefixPath = '', path = '') {
    return url.resolve('https://github.com',
      nps.join(
        repo,
        branch ? 'blob/' + branch : '',
        !prefixPath ? '' : prefixPath,
        path
      )
    )
  }
  if (typeof repository === 'string') {
    let branch = typeof xpath === 'string' ? 'master' : null
    return parse(url.parse(repository).pathname, branch, '', xpath)
  }
  let branch = typeof xpath === 'string'
    ? (repository.branch || 'master') : null

  return parse(
    url.parse(repository.repo).pathname,
    branch,
    typeof xpath === 'string' && repository.prefix,
    xpath
  )
}

exports.Link = class WrapLink extends React.Component {
  render() {
    const { children, to, ...props } = this.props
    return <Link to={u(to)} {...props}>{children}</Link>
  }
}

export function filter(list) {
  return filterLangDocs(removeInformation(list))
}

export function pickByLang(ref, key) {
  let lang = getLang()
  if (lang === 'en') {
    return ref[key]
  }
  return ref[`${key}_${lang}`]
}

export function u(url) {
  if (typeof url !== 'string') {
    return url
  }
  const l = getLang()
  if (l === 'zh' && exports.getLangByPath(url) !== 'zh') {
    if (url === '' || url === '/') {
      url = 'index'
    }
    return url + '_zh'
  }
  return url
}

export function removeInformation(list = []) {
  return list.filter(x => !isInformation(x._key))
}

export function getSort(stringKey) {
  return (a, b) => {
    if (!('order' in a) || !('order' in b)) {
      return a[stringKey].localeCompare(b[stringKey])
    }
    return a.order - b.order
  }
}

export function isInformation(key) {
  return key.endsWith('/__information__')
}

export function first(docList = [], stringKey = '_key') {
  return docList.sort(getSort(stringKey))[0]
}

export function getInformationPath(path = '') {
  // sub path
  if (/^[^\/]+\//.test(path)) {
    return nps.join(nps.dirname(path), '__information__')
  }
  return nps.join(path, '__information__')
}
