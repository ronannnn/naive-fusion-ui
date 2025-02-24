import tailwindcss from '@tailwindcss/vite'
import anchor from 'markdown-it-anchor'
import { defineConfig } from 'vitepress'
import pkg from '../../package.json' with { type: 'json' }
import {
  font,
  github,
  naiveFusionDescription,
  naiveFusionName,
  naiveFusionShortName,
  ogImage,
  ogUrl,
  releases,
} from './meta.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: naiveFusionName,
  description: naiveFusionDescription,
  titleTemplate: naiveFusionShortName,
  head: [
    ['meta', { name: 'theme-color', content: '#241664' }],
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Ronan' }],
    ['meta', { name: 'keywords', content: 'vue, component-library, typescript' }],
    ['meta', { property: 'og:title', content: naiveFusionName }],
    ['meta', { property: 'og:description', content: naiveFusionDescription }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    [
      'link',
      {
        rel: 'preload',
        as: 'style',
        onload: 'this.onload=null;this.rel=\'stylesheet\'',
        href: font,
      },
    ],
    [
      'noscript',
      {},
      `<link rel="stylesheet" crossorigin="anonymous" href="${font}" />`,
    ],
  ],
  lastUpdated: true,
  sitemap: { hostname: ogUrl },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs/overview/getting-started' },
      { text: 'Examples', link: '/examples/checkbox-group' },
      { text: 'Showcase', link: '/showcase' },
      {
        text: `v${pkg.version}`,
        items: [
          { text: 'Release Notes ', link: releases },
        ],
      },
    ],
    outline: {
      level: [2, 3],
    },
    logo: '/logo.svg',

    sidebar: [
      {
        text: 'Overview',
        icon: 'tabler--rocket',
        items: [
          { text: 'Introduction', link: '/docs/overview/introduction' },
          { text: 'Getting Started', link: '/docs/overview/getting-started' },
          { text: 'Releases', link: '/docs/overview/releases' },
        ],
      },
      {
        text: 'Composables',
        icon: 'lucide:square-dashed-mouse-pointer',
        link: '/docs/composables',
        items: [
          { text: 'Color', link: '/docs/composables/color' },
        ],
      },
      {
        text: 'Components',
        icon: 'lucide:box',
        link: '/docs/components/',
        items: [
          {
            text: 'Button',
            items: [
              { text: 'Tooltip Button', link: '/docs/components/buttons/tooltip-button' },
              { text: 'Popconfirm Button', link: '/docs/components/buttons/popconfirm-button' },
              { text: 'Popselect Button', link: '/docs/components/buttons/popselect-button' },
              { text: 'Dropdown Button', link: '/docs/components/buttons/dropdown-button' },
            ],
          },
          { text: 'Scroll', link: '/docs/components/scroll' },
          { text: 'Hover Box', link: '/docs/components/hover-box' },
          { text: 'Dnd', link: '/docs/components/dnd' },
          { text: 'Tab', link: '/docs/components/tab' },
          { text: 'Async Select', link: '/docs/components/async-select' },
          { text: 'Floating Label Input', link: '/docs/components/floating-label-input' },
          {
            text: 'Layout',
            items: [
              { text: 'Simple Layout', link: '/docs/components/layouts/simple-layout' },
            ],
          },
        ],
      },
      {
        text: 'Examples',
        icon: 'lucide:square-dashed-mouse-pointer',
        link: '/examples',
        items: [],
      },
    ],

    socialLinks: [
      { icon: 'github', link: github },
    ],

    search: {
      provider: 'local',
    },
    // carbonAds: {
    //   code: 'CW7DP2JW',
    //   placement: '',
    // },
  },
  srcDir: 'content',
  appearance: 'dark',
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    headers: {
      level: [2, 3],
    },
    anchor: {
      callback(token) {
        // set tw `group` modifier to heading element
        token.attrSet(
          'class',
          'group relative border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2 w-max',
        )
      },
      permalink: anchor.permalink.linkInsideHeader({
        class:
          'header-anchor [&_span]:focus:opacity-100 [&_span_>_span]:focus:outline',
        symbol: `<span class="absolute top-0 -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:flex">&ZeroWidthSpace;<span class="flex h-6 w-6 items-center justify-center rounded-md outline-2 outline-primary text-green-400 shadow-sm  hover:text-green-700 hover:shadow dark:bg-primary/20 dark:text-primary/80 dark:shadow-none  dark:hover:bg-primary/40 dark:hover:text-primary"><svg width="12" height="12" fill="none" aria-hidden="true"><path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></span></span>`,
        renderAttrs: (slug, state) => {
          // From: https://github.com/vuejs/vitepress/blob/256d742b733bfb62d54c78168b0e867b8eb829c9/src/node/markdown/markdown.ts#L263
          // Find `heading_open` with the id identical to slug
          const idx = state.tokens.findIndex((token) => {
            const attrs = token.attrs
            const id = attrs?.find(attr => attr[0] === 'id')
            return id && slug === id[1]
          })
          // Get the actual heading content
          const title = state.tokens[idx + 1].content
          return {
            'aria-label': `Permalink to "${title}"`,
          }
        },
      }),
    },
  },
  transformPageData(pageData) {
    if (pageData.frontmatter.sidebar != null)
      return
    // hide sidebar on showcase page
    pageData.frontmatter.sidebar = pageData.frontmatter.layout !== 'showcase'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
