// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            script: [{ 'data-domain': 'acmusic.app', defer: true, src: 'https://a.erisly.moe/js/script.js' }],
        },
    },
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon', 'vue-types-nuxt'],
    routeRules: {
        '/': {
            prerender: true,
        },
    },
    tailwindcss: {
        addTwUtil: true,
    },
});
