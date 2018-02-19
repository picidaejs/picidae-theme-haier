/**
 * @file: Header
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import React from 'picidae/exports/react'
import { Link as OLink } from 'picidae/exports/react-router'
import {
  Link,
  first,
  getLangByPath,
  getPathFromLang,
  injectScript,
  injectStyle,
  parseGithubRepo
} from '../utils'
import { getLang, switchLang } from '../locale'

const lang2Label = {
  'en': 'English',
  'zh': '中文'
}

let status
export default class Header extends React.PureComponent {
  static defaultProps = {
    logo: {
      src: 'https://github.com/picidaejs/picidaejs/raw/master/logo/picidae-2x.png',
      name: 'Haier'
    },
    headers: [
      'docs', 'api', 'help', /*'blog',*/
      // spec
      'i18n', 'search', 'github', 'changelog'
    ],
    repository: {
      repo: 'picidaejs/picidaejs',
      branch: 'master',
      prefix: ''
    },

    search: {
      // apiKey: '833906d7486e4059359fa58823c4ef56',
      // indexName: 'jest'
    },

    pathname: '',
    document: {
      api: [],
      blog: [],
      docs: [],
      help: null
    }
  }

  state = {
    langMenuVisible: false
  }

  toggleLangMenu = () => {
    this.setState({
      langMenuVisible: !this.state.langMenuVisible
    })
  }

  renderHeaderItem(type) {
    const { pathname, search, document = {}, repository } = this.props
    const { docs, api, help, blog, changelog } = document
    const language = getLang()
    switch (type) {
      case 'docs':
        return docs && !!docs.length && <li key={'docs'}>
          <Link to={first(docs)._key}>
            {__('header.docs')}
          </Link>
        </li>
      case 'api':
        return api && !!api.length && <li key={'api'}>
          <Link to={first(api)._key}>API</Link>
        </li>
      case 'help':
        return help && <li key={'help'}><Link to={'/help'}>
          {__('header.help')}
        </Link></li>
      // TODO
      // case 'blog':
      //   return blog && !!blog.length && <li key={'blog'}>
      //     <Link to={first(blog)._key}>
      //       {__('header.blog')}
      //     </Link>
      //   </li>
      case 'i18n':
        const renderLang = (lang, i) => {
          return (
            <li key={i}>
              <OLink href='javascript:;' to={lang !== language ? getPathFromLang(lang, pathname) : null}>
                {lang2Label[lang]}
              </OLink>
            </li>
          )
        }

        return <span key={'i18n'}>
          <li>
            <a href="javascript:;" onClick={this.toggleLangMenu} className="language-toggle">
              <img className="languages-icon" src={require('./language.svg')}/>
              {lang2Label[language]}
            </a>
            {this.state.langMenuVisible && <div id="languages-dropdown" /* className="visible"*/>
              <ul id="languages-dropdown-items">
                {['en', 'zh'].map(renderLang)}
              </ul>
            </div>}
          </li>
        </span>
      case 'search':
        if (!search) {
          return null
        }
        return <li key={'search'} className="navSearchWrapper reactNavSearchWrapper">
          <input ref={r => this.searchInput = r} type={'text'} id={'doc-search-input'}
                 placeholder={__('header.search.placeholder')}/>
        </li>
      case 'github':
        return <li key={'github'}>
          <a href={parseGithubRepo(repository)} target="_self">GitHub</a>
        </li>
      case 'changelog':
        return <li key={type}><Link to={'/' + type}>
          {__('header.' + type)}
        </Link></li>
      default:
        return !!type && !!type.url && <li key={type.url}><Link to={type.url.replace(/^\/*/, '/')}>
          {type.i18n ? type.i18n[language] : type.name}
        </Link></li>
    }
  }

  handleKeyDown = event => {
    if (
      // 'F'
      event.keyCode === 70
      && event.target === document.body
      && !(event.metaKey || event.ctrlKey)
    ) {
      this.searchInput.focus()
      event.preventDefault()
    }
  }

  componentDidMount() {
    let sep = 0
    if (!status && this.shouldSearchRegister()) {
      status = 'pending'
      // require('docsearch.js') will throw zepto.js error
      // don't know the reason
      injectScript('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js', err => {
        sep++
        if (sep === 2) {
          status = 'done'
        }
        this.regSearch()
      })
      injectStyle('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css', function () {
        sep++
        if (sep === 2) {
          status = 'done'
        }
      })
    }
    if (status === 'done') {
      this.regSearch()
    }
    document.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate() {
  }

  shouldSearchRegister() {
    const { search, headers } = this.props
    return search && headers.includes('search')
  }

  regSearch() {
    const { search } = this.props
    if (this.shouldSearchRegister()) {
      docsearch({
        ...search,
        inputSelector: '#doc-search-input',
        algoliaOptions: { facetFilters: [`tags:${getLang()}`] },
        debug: process.env.NODE_ENV !== 'production'
      });
    }
  }

  render() {
    const { logo, headers, repository } = this.props

    return (
      <div className="fixedHeaderContainer">
        <div className="headerWrapper wrapper">
          <header>
            <Link to="/">
              {logo.src && <img className="logo" src={logo.src}/>}
              {logo.name && <h2 className="headerTitle">{logo.name}</h2>}
            </Link>
            <div className="navigationWrapper navigationSlider">
              <nav className="slidingNav">
                <ul className="nav-site nav-site-internal">
                  {
                    headers.map(this.renderHeaderItem.bind(this))
                  }
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </div>
    )
  }
}
