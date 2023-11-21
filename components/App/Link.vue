<template>
    <a class="text-blue-600" target="_blank" :href="href">
        <slot />
    </a>
</template>

<script lang="ts">
import { string } from 'vue-types';

export default defineComponent({
    props: {
        href: string(),
    },
});
</script>
