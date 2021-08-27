import colors from 'vuetify/es5/util/colors'

export default {
    target: 'server',
    ssr: true,
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Biddabari',
        title: 'Biddabari',
        htmlAttrs: { lang: 'en', amp: true },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Biddabari' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
            {
                rel: 'stylesheet',
                href: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
                integrity: 'sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==',
                crossorigin: 'anonymous'
            }

        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/marchforwardbd.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/notifier.js',
        { src: '~/assets/js/marchforwardbd.js', mode: 'client' },
        {
            type: 'text/javascript',
            src: '~/plugins/v-video-embed.js',
            defer: true,
            mode: 'client'
        },
        { src: '~/plugins/countdown.js', mode: 'client' },
        { src: '~/plugins/filters.js', mode: 'client' },
        { src: '~/plugins/katex.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.API_URL + '/'
        // credentials: true
    },
    auth: {
        // localStorage: false,
        /* cookie: {
            options: {
                expires: 7
            }
        }, */
        /* strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: 'user',
                    autoFetch: true
                },
                endpoints: {
                    login: { url: 'api/login', method: 'post' },
                    // logout: { url: 'api/logout', method: 'post' },
                    logout: false,
                    user: { url: 'api/user', method: 'get' }
                    // user: false
                }
            }
        } */
        strategies: {
            auth: {
                scheme: '~/schemes/auth',
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: 'user',
                    autoFetch: true
                },
                endpoints: {
                    login: { url: 'api/login', method: 'post' },
                    logout: false,
                    user: { url: 'api/user', method: 'get' }
                }
            }
        },
        redirect: {
            login: '/auth/login',
            logout: '/',
            callback: '/auth/login',
            home: '/'
        }
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        splitChunks: {
            layouts: true
        },
        extractCSS: true,
        transpile: [
            'vee-validate'
        ]
    },
    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'navActive'
        // middleware: "guest",
    },
    env: {
        API_URL: process.env.API_URL
    },
    server: {
        port: process.env.APP_PORT
    }
}
