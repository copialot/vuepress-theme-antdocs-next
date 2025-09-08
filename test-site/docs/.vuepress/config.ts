import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { antDocsTheme } from 'vuepress-theme-antdocs'

export default defineUserConfig({
  title: 'Test AntDocs Theme',
  description: 'Testing the AntDocs theme for VuePress 2.x',

  bundler: viteBundler(),

  theme: antDocsTheme({
    // Theme configuration
  }),
})
