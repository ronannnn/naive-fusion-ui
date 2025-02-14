// noinspection ES6PreferShortImport: IntelliJ IDE hint to avoid warning to use `~/contributors`, will fail on build if changed

/* Texts */
export const naiveFusionName = 'Naive Fusion UI'
export const naiveFusionShortName = 'Naive Fusion UI'
export const naiveFusionDescription = 'An open-source library with NaiveUI and Tailwindcss'

/* CDN fonts and styles */
export const googleapis = 'https://fonts.googleapis.com'
export const gstatic = 'https://fonts.gstatic.com'
export const font = `${googleapis}/css2?family=Inter:wght@100..900&display=swap`

/* vitepress head */
export const ogUrl = 'https://naive-fusion-ui.com/'
export const ogImage = `${ogUrl}og.jpg`

/* GitHub and social links */
export const github = 'https://github.com/ronannnn/naive-fusion-ui'
export const releases = 'https://github.com/ronannnn/naive-fusion-ui/releases'
// export const discord = 'https://chat.unovue.com'
// export const mastodon = "https://elk.zone/m.webtoo.ls/@vitest";
// export const twitter = "https://twitter.com/vitest_dev";

/* Avatar/Image/Sponsors servers */
// export const sponsor = 'https://github.com/sponsors/zernonia'
// export const preconnectLinks = [googleapis, gstatic]
// export const preconnectHomeLinks = [googleapis, gstatic]

/* PWA runtime caching urlPattern regular expressions */
export const pwaFontsRegex = new RegExp(`^${googleapis}/.*`, 'i')
export const pwaFontStylesRegex = new RegExp(`^${gstatic}/.*`, 'i')
// eslint-disable-next-line prefer-regex-literals
export const githubusercontentRegex = new RegExp(
  '^https://((i.ibb.co)|((raw|user-images).githubusercontent.com))/.*',
  'i',
)
