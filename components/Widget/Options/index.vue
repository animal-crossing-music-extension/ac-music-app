<template>
    <div>
        <Transition>
            <AppButton v-if="show || active" icon="fluent:settings-24-filled" content="Options" @click="show = !show" />
        </Transition>

        <div v-if="show" class="cover" @click="show = false" />

        <Transition>
            <div v-if="show" class="flex items-center justify-center text-black pointer-events-none cover backdrop-blur-sm">
                <div
                    class="w-[600px] p-4 max-w-[100%] max-h-[100%] bg-white rounded-lg pointer-events-auto bg-opacity-90 h-[500px] relative flex gap-4 options"
                >
                    <AppButton icon="mingcute:close-fill" color="black" class="absolute shadow-lg top-4 right-8" @click="show = false" />
                    <WidgetOptionsSidebar :selected-page="pendingSelection || page || undefined" @selected="selected" />

                    <TransitionGroup @after-leave="finishSelection">
                        <WidgetOptionsMain v-if="page == 'options'" key="options" class="w-full overflow-y-scroll" @selected="selected" />
                        <WidgetOptionsLocation v-if="page == 'live-weather'" key="live-weather" class="w-full overflow-y-scroll" />
                        <WidgetOptionsAbout v-if="page == 'about'" key="about" class="w-full overflow-y-scroll" />
                    </TransitionGroup>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { bool } from 'vue-types';
import { Constants } from '~/lib';

export default defineComponent({
    props: {
        active: bool().def(true),
    },
    data(): {
        show: boolean;

        page: Constants.OptionsPage | null;
        pendingSelection: Constants.OptionsPage | null;
    } {
        return {
            show: false,

            page: Constants.OptionsPage.Options,
            pendingSelection: null,
        };
    },
    methods: {
        selected(page: Constants.OptionsPage) {
            this.pendingSelection = page;
            this.page = null;
        },
        finishSelection() {
            this.page = this.pendingSelection;
        },
    },
});
</script>

<style scoped>
.cover {
    @apply fixed top-0 left-0 w-screen h-screen;
}

:deep(h2),
:deep(h3) {
    @apply font-bold;
}

:deep(h2) {
    @apply text-xl my-2;
}

:deep(h3) {
    @apply mt-2;
}

:deep(input[type='radio']) {
    @apply my-2;
}

:deep(input) {
    @apply accent-green-500;
}

:deep(.option) {
    @apply flex items-center gap-2;
}

:deep(.suboption) {
    @apply ml-[21px];
}
</style>
