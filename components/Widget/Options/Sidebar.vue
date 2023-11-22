<template>
    <div>
        <div class="flex flex-col gap-2">
            <div>
                <img src="/icon/128.png" width="128" height="128" />
                <h1 class="text-2xl font-bold">AC Music</h1>
                <AppLink href="https://acmusic.app">
                    <Icon name="ph:link-bold" class="mr-1" />
                    <span>acmusic.app</span>
                </AppLink>
            </div>

            <p
                v-for="page of pages"
                :key="page.id"
                class="pl-3 -ml-4 font-semibold border-l-4 cursor-pointer"
                :class="{ selected: page.id == selectedPage }"
                @click="select(page.id)"
            >
                {{ page.name }}
            </p>

            <a href="https://discord.gg/dCzkhPwuKn" target="_blank">
                <AppButton content="Discord" icon="bi:discord" color="discord" />
            </a>
            <a href="https://github.com/animal-crossing-music-extension/ac-music-app" target="_blank">
                <AppButton content="GitHub" icon="bi:github" color="github" />
            </a>
            <a href="https://twitter.com/ac_music_ext" target="_blank">
                <AppButton content="Twitter" icon="bi:twitter" color="twitter" />
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { string } from 'vue-types';
import { Constants } from '~/lib';

export default defineComponent({
    props: {
        selectedPage: string<Constants.OptionsPage>(),
    },
    emits: ['selected'],
    computed: {
        pages() {
            return Constants.OptionsPages;
        },
    },
    methods: {
        select(page: Constants.OptionsPage) {
            if (page == this.selectedPage) return;
            this.$emit('selected', page);
        },
    },
});
</script>

<style scoped>
.selected {
    @apply border-black font-bold;
}
</style>
