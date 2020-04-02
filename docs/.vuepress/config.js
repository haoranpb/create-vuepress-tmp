const { description } = require('../../package.json')

module.exports = {
  title: 'create-vuepress-tmp',
  description: description,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: 'ludanxer/create-vuepress-tmp',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Guide',
        link: '/guide/getting-started.html',
      },
      {
        text: 'VuePress',
        link: 'https://vuepress.vuejs.org'
      }
    ],
    sidebar: {
      '/guide/': [{
        title: 'Guide',
        path: '/guide/',
        collapsable: false,
        children: [
          ['', 'Introduction'],
          'getting-started'
        ]
      }]
    },
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    require('./internal-plugin.js'),
  ]
}
