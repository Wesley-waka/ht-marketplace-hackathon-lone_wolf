// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({

  modules: [
    "nuxt-security",
    // "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/google-fonts",
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',

    '@primevue/nuxt-module',
    [
      "@pinia/nuxt",
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
      }
    ],


  ],

  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: 3100,
      },
    },
    build: {
      rollupOptions: {
        // external: ['js-cookie']
      }
    }
  },

  // plugins: [
  //   '~/plugins/pinia.js',  // Make sure this file is registered
  // ],

  app: {
    head: {
      link: [
        // fonts or other stuff
        // icon
        { rel: "icon", type: "image/webp", href: "/logo.png" },
        { rel: "apple-touch-icon", type: "image/webp", href: "/logo.png" },
        // metadata
      ],
    },
    pageTransition: {
      name: "fade",
      mode: "out-in"
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in",
    },
  },

  routeRules: {
    "/admin": { redirect: "/" },
  },

  imports: {
    dirs: ['stores']
  },

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
      port: process.env.PORT,
      // host: process.env.NUXT_HOST,
    },
  },

  build: {
    transpile: ['vue-sonner']
  },

  // pinia: {
  //   autoImports: [
  //     'defineStore',
  //     'storeToRefs',
  //     'acceptHMRUpdate'
  //   ]
  // },

  // auth: {
  //   baseURL: process.env.API_URL,
  //   globalAppMiddleware: {
  //     isEnabled: true,
  //     allow404WithoutAuth: true,
  //     addDefaultCallbackUrl: '/'
  //   },
  //   session: {
  //     enableRefreshOnWindowFocus: true,
  //     enableRefreshPeriodically: false
  //   },
  //   provider: {
  //     type: 'local',
  //     pages: {
  //       login: '/'
  //     },
  //     endpoints: {
  //       signUp: { path: '/auth/signup', method: 'post' },
  //       signIn: { path: '/', method: 'post' },
  //       signOut: { path: '/auth/logout', method: 'get' },
  //       getSession: {
  //         path: '/users/getMe',
  //         method: 'get'
  //       }
  //     },
  //     token: {
  //       signInResponseTokenPointer: '/token',
  //       maxAgeInSeconds: 60 * 60 * 3
  //     }
  //   }
  // },

  security: {
    enabled: false,
    headers: {
      // crossOriginEmbedderPolicy: process.env.STAGE === 'development' ? 'unsafe-none' : 'require-corp',
      referrerPolicy: 'strict-origin-when-cross-origin',
      xFrameOptions: 'SAMEORIGIN',
    },
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: false
        }
      },
      ripple: true,
    },
    components: {
      prefix: '',
      exclude: []
    }
  },

  tailwindcss: {
    cssPath: [
      '@/assets/css/tailwind.css',
      { injectPosition: 'first' }
    ],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },

  css: [
    "@/assets/fonts/font-awesome/all.css",
    "@/assets/fonts/mdi/materialdesignicons.scss",
    "@/assets/scss/theme.scss",
    "primeicons/primeicons.css",
    "@/assets/css/fonts.css",
  ],

  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
