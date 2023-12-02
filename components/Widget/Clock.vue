<template>
    <div class="text-center">
        <p class="font-bold text-9xl">{{ timeS }}</p>
        <p class="text-4xl">{{ dateS }}</p>
    </div>
</template>

<script lang="ts">
import { number } from 'vue-types';

export default defineComponent({
    props: {
        time: number().isRequired,
    },
    data(): {
        interval: NodeJS.Timeout | null;

        timeS: string;
        dateS: string;
        background: string;
    } {
        return {
            interval: null,

            timeS: '',
            dateS: '',
            background: '',
        };
    },
    mounted() {
        this.interval = setInterval(() => this.updateTime(), 100);
        this.updateTime();
    },
    beforeUnmount() {
        if (this.interval) clearInterval(this.interval);
    },
    methods: {
        updateTime() {
            const date = new Date(this.time);
            this.timeS = date.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            });
            this.dateS = date.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });
        },
    },
});
</script>
