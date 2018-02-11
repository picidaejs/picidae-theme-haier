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
import nps from 'path'

const lang2Label = {
  'en': 'English',
  'zh': '中文'
}

let done = false

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
          <input type={'text'} id={'doc-search-input'}
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
        return <li key={type}><Link to={'/' + type}>
          {type}
        </Link></li>
    }
  }

  componentDidMount() {
    this.regSearch()
  }

  componentDidUpdate() {
    this.regSearch()
  }

  shouldSearchRegister() {
    const { search, headers } = this.props
    return search && headers.includes('search')
  }

  regSearch() {
    if (this.shouldSearchRegister()) {
      // done = true
      const docsearch = require('docsearch.js')
      require('docsearch.js/dist/cdn/docsearch.css')
      docsearch({
        apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
        indexName: 'ant_design',
        inputSelector: '#doc-search-input',
        algoliaOptions: { facetFilters: [`tags:${getLang()}`] },
        transformData(hits) {
          debugger
          hits.forEach((hit) => {
            hit.url = hit.url.replace('ant.design', location.host);
            hit.url = hit.url.replace('https:', location.protocol);
          });
          return hits;
        },
        debug: true, // Set debug to true if you want to inspect the dropdown
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
              <img className="logo" src={logo.src}/>
              <h2 className="headerTitle">{logo.name}</h2>
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
