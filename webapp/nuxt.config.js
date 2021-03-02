export default {
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 's5nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
  ],

  proxy: ['http://localhost/api/**'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      local: {
        tokenRequired: false,
        endpoints: {
          login: { url: '/api/login_check', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/api/secure/user', method: 'get', propertyName: false},
        },
      },
      // The cookie strategie exists in nuxt/auth-next
      // Got problem with auth-next
      //    user is not fetched after login 200 response
      //    loggedIn is not changed to true after login 200 response
      // cookie: {
      //   endpoints: {
      //     login: { url: '/api/login_check', method: 'post', propertyName: 'token', headers: { 'Content-Type': 'application/json' } },
      //     logout: false,
      //     user: { url: '/api/secure/user', method: 'get', propertyName: 'username'},
      //   },
      //   cookie: {
      //     name: "BEARER"
      //   }
      // },
    }
  }
}
