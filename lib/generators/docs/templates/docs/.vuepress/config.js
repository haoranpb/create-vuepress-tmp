const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://vuepress.vuejs.org/config/#title
   */
  title: 'Vuepress Docs Boilerplate',
  /**
   * Ref：https://vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    // https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: 'Help us improve this page!',
    // https://vuepress.vuejs.org/theme/default-theme-config.html#last-updated
    lastUpdated: false,
    // https://vuepress.vuejs.org/theme/default-theme-config.html#navbar
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'VuePress',
        link: 'https://vuepress.vuejs.org'
      }
    ],
    // https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'deploy',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://vuepress.vuejs.org/plugin/
   */
  plugins: [
    // You can manually enalbe/disalbe the plugin like this
    ['@vuepress/plugin-back-to-top', true],
    '@vuepress/plugin-medium-zoom',
  ]
}
