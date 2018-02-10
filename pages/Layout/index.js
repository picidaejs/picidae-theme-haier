/**
 * @file: Layout
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */

import React from 'picidae/exports/react'

import c from 'classname'
import * as u from '../utils'
import { switchLang } from '../locale'
import '../style/index.less'
import Header from './Header'
import transformer from '../transformer'
import Style from './style'

const t = transformer()

export default class Layout extends React.PureComponent {
  constructor(props) {
    super(props)
    const { pathname } = props.location
    switchLang(u.getLangByPath(pathname))

    const transformers = this.props.data.transformers
    !transformers.includes(t) && transformers.push(t)
  }

  componentWillReceiveProps() {
    const { pathname } = props.location
    switchLang(u.getLangByPath(pathname))
  }

  componentDidMount() {
    if (typeof window.ga !== 'undefined') {
      this.context.router.listen(loc => {
        window.ga('send', 'pageview', loc.pathname + loc.search)
      })
    }
  }

  render() {
    const { children, location, themeConfig, ...rest } = this.props
    const { footer } = themeConfig
    const meta = this.props.data.meta
    const utils = this.props.pluginData.utils


    return (
      <div className={c(location.pathname.replace(/^\/+/, '').includes('/') && 'sideNavVisible')}>
        <Style {...themeConfig.style} />
        <Header
          {...themeConfig}
          pathname={location.pathname}
          document={{
            docs: u.filter(utils.group('docs')),
            api: u.filter(utils.group('api')),
            blog: u.filter(utils.group('blog')),
            help: meta.help,
            changelog: meta.changelog
          }}
        />
        <div className="navPusher">
          {children}
        </div>
        <footer className='nav-footer'>
          {footer && footer.organization && <a
            href={footer.organization.to}
            target="_blank"
            className="fbOpenSource">
            <img src={footer.organization.logo}/>
          </a>}
          <section className="copyright">
            {footer ? footer.copyright : ''}<br/>
            Powered by <a href={'https://github.com/picidaejs/picidae-theme-haier'} target={'_blank'}>🍔 Haier</a>.
          </section>
        </footer>
      </div>
    )
  }
}
