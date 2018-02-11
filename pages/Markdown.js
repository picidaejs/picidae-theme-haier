/**
 * @file: Markdown
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import React from 'picidae/exports/react'
import collect from 'picidae-tools/browser/collect'
import Title from 'react-document-title'
import { exists } from './locale'

@collect()
export default class Markdown extends React.PureComponent {
  componentWillMount() {
    if (this.props.setSidebarVisible) {
      this.props.setSidebarVisible(false)
    }
  }

  render() {
    const { render, pageData, themeConfig, location: { pathname } } = this.props
    const i18nKey = 'title.' + pathname.replace(/_zh$/, '')
    let title = pageData.meta.title
    if (pathname === '' || pathname === '/' || pathname === 'index' || pathname === 'index_zh') {
      title = `${themeConfig.logo.name} - ${themeConfig.description}`
    } else {
      title = `${title ? title : __(i18nKey)} - ${themeConfig.logo.name}`
    }

    return (
      <div className='docMainWrapper wrapper'>
        <Title title={title} />
        <div className='container mainContainer documentContainer postContainer'>
          <div className='wrapper'>
            <div className='post'>
              {render()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
