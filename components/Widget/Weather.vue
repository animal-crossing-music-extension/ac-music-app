<template>
    <div v-if="options.location.selection != 'disabled'" class="relative w-full h-full font-bold">
        <Transition>
            <div v-if="weather.fetched" class="absolute bottom-0 flex items-center gap-4 text-2xl">
                <Icon v-if="weather.icon" :name="weather.icon" size="64" />
                <p>{{ weather.temperature }}</p>
            </div>
            <p v-else class="absolute bottom-0 animate-pulse-color">Loading weather...</p>
        </Transition>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            options: useOptionsStore(),
            weather: useWeatherStore(),
        };
    },
});
</script>
