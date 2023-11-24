// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
