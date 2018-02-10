/**
 * @file: Markdown
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import React from 'picidae/exports/react'
import collect from 'picidae-tools/browser/collect'
import { getLang } from './locale'
import * as u from './utils'
import { Link } from './utils'
import c from 'classname'
import nps from 'path'

function warnNoInformation(inforPath) {
  console.error(`Warning: the information markdown not found: ${inforPath}.`)
}

@collect()
export default class MarkdownToc extends React.PureComponent {
  state = {
    active: false
  }
  toggle = evt => {
    this.setState({
      active: !this.state.active
    })
  }

  getData() {
    const { render, pageData, pluginData: { utils }, data: { meta }, location: { pathname } } = this.props
    const document = {
      docs: u.filter(utils.group('docs')),
      api: u.filter(utils.group('api'))
    }
    const others = Object.keys(meta) // @TODO blog /^(docs|api|blog)\/|^help(_zh)?$|^index(_zh)?$|^[^\/]$/
                   .filter(key => !/^(docs|api)\/|^help(_zh)?$|^index(_zh)?$|^[^\/]$/.test(key))
    others.forEach(key => {
      if (u.isInformation(key)) {
        return
      }
      const lang = u.getLangByPath(key)
      if (lang !== getLang()) {
        return
      }
      let groupName = key.split('/')[0]
      document[groupName] = document[groupName] || []
      document[groupName].push({
        ...meta[key],
        _key: key
      })
    })
    const info = {}
    let groupNames = Object
      .keys(document)
      .map(groupName => {
        const inforPath = u.getInformationPath(groupName)
        let infoItem
        if (!meta[inforPath]) {
          warnNoInformation(inforPath)
          infoItem = { title: groupName }
        } else {
          infoItem = meta[inforPath]
        }

        info[groupName] = infoItem
        return { ...infoItem, _g: groupName }
      })
      .sort(u.getSort('_g'))
      .map(a => a._g)

    const page = {}
    let flag = false
    groupNames.some(g => {
      return document[g].some(d => {
        if (flag === true) {
          page.next = d
          return true
        }
        if (d._key === pathname) {
          flag = true
          page.curr = d
          return
        }
        page.prev = d
      })
    })

    return {
      page,
      groupNames,
      info,
      document
    }
  }

  renderGroups({ groupNames, info, document }) {
    const { render, pageData, pluginData: { utils }, data: { meta }, location: { pathname } } = this.props
    const renderLi = d => {
      const active = d._key === pathname
      return (
        <li key={d._key} className={c('navListItem', active && 'navItemActive')}>
          <Link to={d._key} className={active ? 'navItemActive' : ''}>{d.title}</Link>
        </li>
      )
    }

    const renderNav = (groupName) => (
      document[groupName] && !!document[groupName].length
      && <div key={groupName} className='navGroupActive navGroup'>
        <h3>{u.pickByLang(info[groupName], 'title')}</h3>
        <ul>
          {
            document[groupName].map(renderLi)
          }
        </ul>
      </div>
    )

    return (
      <div className='navGroups'>
        {groupNames.map(renderNav)}
      </div>
    )
  }

  renderSideBar(d) {
    const { render, pageData, data: { meta }, location: { pathname } } = this.props
    const { active } = this.state
    const inforPath = u.getInformationPath(pathname)

    let navTitle
    if (!meta[inforPath]) {
      warnNoInformation(inforPath)
      navTitle = nps.basename(nps.dirname(pathname))
    }
    else {
      navTitle = meta[inforPath].title
    }

    return (
      <div className={c('container docsNavContainer', active && 'docsSliderActive')}>
        <nav className='toc'>
          <div className='toggleNav'>
            <section className='navWrapper wrapper'>
              <div className='navBreadcrumb wrapper'>
                <div className={'navToggle'} onClick={this.toggle}>
                  <i/>
                </div>
                <h2>
                  <i>{'>'}</i>
                  <span>{navTitle}</span>
                </h2>
              </div>
              {this.renderGroups(d)}
            </section>
          </div>
        </nav>
      </div>
    )
  }

  render() {
    const d = this.getData()
    const { render, pageData, location, themeConfig } = this.props
    const githubHref = u.parseGithubRepo(themeConfig.repository, location.pathname)
    return (
      <div className='docMainWrapper wrapper'>
        {this.renderSideBar(d)}
        <div className='container mainContainer'>
          <div className='wrapper'>
            <div className='post'>
              <header className='postHeader'>
                <a href={githubHref} className='edit-page-link button' target="_blank">Edit</a>
                <h1>{pageData.meta.title}</h1>
              </header>
              {render()}
            </div>
            <div className='docs-prevnext'>
              {d.page.prev && <Link to={d.page.prev._key} className='docs-prev button'>{'← ' + d.page.prev.title}</Link>}
              {d.page.next && <Link to={d.page.next._key} className='docs-next button'>{d.page.next.title + ' →'}</Link>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
