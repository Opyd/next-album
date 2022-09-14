const development = process.env.NODE_ENV !== 'production'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Next Album',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-toastification/dist/index.css',
    '~/assets/tooltip.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/fontawesome.js', ssr: true },
    { src: '~/plugins/tooltip.js', ssr: true, mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/auth-next',
    [
      'vue-toastification/nuxt',
      {
        timeout: 2000,
        maxToasts: 2,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: development
      ? 'http://localhost:3100/v1/'
      : 'http://srv12.mikr.us:20109/v1/',
  },

  auth: {
    redirect: false,
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },

        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: 'auth/signin',
            method: 'post',
          },
          logout: false,
          user: { url: '/users', method: 'get' },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [],
  },
}
