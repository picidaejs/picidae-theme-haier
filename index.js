/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */

module.exports = {
  // picker() {
  //
  // },

  root: './pages',
  routes: {
    path: '/',
    component: './Layout/index',
    indexRoute: {
      component: './Markdown',
    },
    childRoutes: [
      // remove help route for ssr not throw error
      // {
      //   path: 'help',
      //   component: './Markdown',
      // },
      {
        path: 'api/*',
        component: './MarkdownToc',
      },
      {
        path: 'docs/*',
        component: './MarkdownToc',
      },
      {
        path: '*/*',
        component: './MarkdownToc',
      },
      {
        path: 'api',
        component: './MarkdownToc',
      },
      {
        path: 'docs',
        component: './MarkdownToc',
      },
      {
        path: '*',
        component: './Markdown',
      }
    ]
  },

  notFound: './NotFound',

  config: {
    versions: [
      {
        name: 'master', active: true
      },
      {
        name: '1.0', to: 'http://sssssss'
      }
    ],

    logo: {
      src: 'https://github.com/picidaejs/picidaejs/raw/master/logo/picidae-2x.png',
      name: 'Haier'
    },

    // work on title
    description: '🍔 The universal picidae theme for project / library / framework etc.',

    headers: [
      'docs', 'api', 'help', /*'blog',*/
      // spec
      'i18n', 'search', 'github'
    ],
    repository: {
      repo: 'https://github.com/picidaejs/picidae-theme-haier',
      branch: 'master',
      prefix: 'test'
    },

    search: {
      apiKey: '833906d7486e4059359fa58823c4ef56',
      indexName: 'jest'
    },

    footer: {
      organization: {
        to: 'https://github.com/picidaejs/picidaejs',
        logo: 'https://github.com/picidaejs/picidaejs/raw/master/logo/picidae-2x.png'
      },
      copyright: 'Copyright © 2018 - Powered by Picidae.'
    }
  }
}
