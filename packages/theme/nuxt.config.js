import webpack from 'webpack';
import { VSF_LOCALE_COOKIE } from '@vue-storefront/core';
import theme from './themeConfig';
import { getRoutes } from './routes';

export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  api: {
    baseURL: 'https://front.dlds.cl'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DLDS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      }
    ]
  },

  loading: { color: '#fff' },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/prestashop',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/prestashop',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/prestashop-api',
          composables: '@vue-storefront/prestashop'
        }
      },
      routes: false
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/prestashop/nuxt', {}]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-i18n', {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt'
  ],

  i18n: {
    currency: 'CLP',
    country: 'cl',
    countries: [
      { name: 'US', label: 'United States', states: ['California', 'Nevada'] },
      { name: 'AT', label: 'Austria' },
      { name: 'DE', label: 'Germany' },
      { name: 'NL', label: 'Netherlands' }
    ],
    currencies: [
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' }
    ],
    locales: [
      { code: 'en', label: 'English', file: 'en.js', iso: 'en' }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
          }
        },
        cl: {
          currency: {
            style: 'currency', currency: 'CLP', currencyDisplay: 'symbol'
          },
          currencyNoCents: {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 4, // set fraction digits to 0 to remove cents
            maximumFractionDigits: 4
          }
        }
      }
    },
    detectBrowserLanguage: {
      cookieKey: VSF_LOCALE_COOKIE
    }
  },

  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },

  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}/_theme`)
        .forEach((route) => routes.unshift(route));
    },
    middleware: ['checkout'],
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
  publicRuntimeConfig: {
    theme,
    // middlewareUrl: 'https://inspiring-bavarois-b79b58.netlify.app/api/',
    psCustomerCookieKey: 'ps-customer-cookie-key',
    psCustomerCookieValue: 'ps-customer-cookie-value'
  },
  pwa: {
    meta: {
      theme_color: '#5ECE7B'
    }
  },
  googleFonts: {
    families: {
      Roboto: true,
      Montserrat: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      },
      Lato: {
        wght: [100, 300, 400, 700, 900]
      },
      Raleway: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    },
    download: false,
  },
};
