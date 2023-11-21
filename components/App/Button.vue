<template>
    <button class="flex items-center justify-center gap-2 px-4 py-2 font-bold text-white transition-colors rounded" :class="classes">
        <Icon v-if="icon" :name="icon" size="24" />
        <span v-if="content">{{ content }}</span>
    </button>
</template>

<script lang="ts">
import { oneOf, string } from 'vue-types';

export default defineComponent({
    props: {
        content: string(),
        icon: string(),
        color: oneOf(['black', 'green', 'red', 'discord', 'github', 'twitter'] as const).def('green'),
    },
    computed: {
        classes() {
            switch (this.color) {
                case 'black':
                    return 'bg-black hover:bg-gray-700';
                case 'red':
                    return 'bg-red-500 hover:bg-red-600';
                case 'discord':
                    return 'bg-[#5865F2] hover:bg-[#4953B8]';
                case 'github':
                    return 'bg-[#333] hover:bg-[#222]';
                case 'twitter':
                    return 'bg-[#1da1f2] hover:bg-[#0d8ecf]';
                case 'green':
                default:
                    return 'bg-green-500 hover:bg-green-600';
            }
        },
    },
});
</script>
