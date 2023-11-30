<template>
    <button :disabled="disabled" class="flex items-center justify-center gap-2 text-white transition-colors rounded" :class="classes">
        <Icon v-if="icon" :name="icon" size="24" />
        <span v-if="content">{{ content }}</span>
    </button>
</template>

<script lang="ts">
import { bool, oneOf, string } from 'vue-types';

export default defineComponent({
    props: {
        content: string(),
        icon: string(),
        disabled: bool(),
        color: oneOf(['black', 'green', 'red', 'discord', 'github', 'twitter'] as const).def('green'),
        size: oneOf(['sm', 'md'] as const).def('md'),
    },
    computed: {
        classes() {
            return [this.sizeClasses, this.colorClasses];
        },
        colorClasses() {
            if (this.disabled) return tw('bg-gray-500 cursor-not-allowed');

            switch (this.color) {
                case 'black':
                    return tw('bg-black hover:bg-gray-700');
                case 'red':
                    return tw('bg-red-500 hover:bg-red-600');
                case 'discord':
                    return tw('bg-[#5865F2] hover:bg-[#4953B8]');
                case 'github':
                    return tw('bg-[#333] hover:bg-[#222]');
                case 'twitter':
                    return tw('bg-[#1da1f2] hover:bg-[#0d8ecf]');
                case 'green':
                default:
                    return tw('bg-green-500 hover:bg-green-600');
            }
        },
        sizeClasses() {
            switch (this.size) {
                case 'sm':
                    return tw('px-2 py-1 font-semibold');
                case 'md':
                default:
                    return tw('px-4 py-2 font-bold');
            }
        },
    },
});
</script>
