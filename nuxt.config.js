export default {
  head: {
    title: 'games-app',
    target: 'static',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  target: 'static',

  css: [
    '~/assets/css/index.scss'
  ],

  plugins: [
    { src: '@/plugins/clickOutside', ssr: false },
    { src: '@/plugins/swiper', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module'
  ],

  toast: {
    position: 'bottom-right',
    duration: 2000
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    ['nuxt-lazy-load', {
      defaultImage: '/blank-img.png',
      }
    ]
  ],

  axios: {
    baseURL: process.env.BASE_URL
  },

  styleResources: {
    scss: [
      '@/assets/css/vars.scss'
    ],
  },

  generate: {
    fallback: true,
    crawler: false
  },

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },

  build: {
  }
}
