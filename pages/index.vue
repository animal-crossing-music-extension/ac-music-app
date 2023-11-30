<template>
    <div>
        <div ref="sky" :style="{ backgroundColor: skyColor }" class="background" />
        <div ref="sun" :style="{ backgroundColor: sunColor }" class="background" />

        <main
            class="relative grid w-screen h-screen p-4 text-white sm:p-8"
            :class="{ 'cursor-pointer': ready == 0 }"
            @click="click"
            @mousemove="keepActive"
        >
            <div class="flex items-center gap-8 grid-area-[logo]">
                <img src="/icon/128.png" width="64" height="64" />
                <p class="font-bold">AC Music App</p>
            </div>
            <div class="flex justify-end grid-area-[options]">
                <WidgetOptions v-if="ready" :active="active" />
            </div>
            <div class="flex flex-col items-center justify-center grid-area-[clock]">
                <Transition @after-leave="ready = 2">
                    <p v-if="ready == 0" class="text-5xl font-bold text-white">Click to start!</p>
                </Transition>
                <Transition>
                    <WidgetClock v-if="ready >= 2" :time="time" />
                </Transition>
            </div>
            <div class="flex items-end grid-area-[weather]">
                <Transition>
                    <WidgetWeather v-if="ready" />
                </Transition>
            </div>
            <div class="flex items-end justify-end grid-area-[player]">
                <Transition>
                    <WidgetMusicPlayer v-if="ready" :time="time" :debug="DEBUG" />
                </Transition>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { Constants, Keyframes } from '~/lib';

export default defineComponent({
    data(): {
        DEBUG: boolean;

        timeInterval: NodeJS.Timeout | null;
        backgroundInterval: NodeJS.Timeout | null;
        mousemoveTimeout: NodeJS.Timeout | null;

        skyKeys: Keyframes;
        sunKeys: Keyframes;
        skyColor: string;
        sunColor: string;

        ready: number;
        time: number;
        active: boolean;
    } {
        return {
            DEBUG: false,

            timeInterval: null,
            backgroundInterval: null,
            mousemoveTimeout: null,

            skyKeys: new Keyframes(Constants.SkyColors),
            sunKeys: new Keyframes(Constants.SunColors),
            skyColor: '#000',
            sunColor: '#000',

            ready: 0,
            time: Date.now(), // this time variable should be used everywhere instead of Date.now() to ensure synchronisation (mainly in DEBUG mode)
            active: true,
        };
    },
    mounted() {
        // a global subscriber for options with the sole purpose of handling the synchronisation between the options and music stores
        // when the options are set to "random", this subscriber will tell the music store to pick a random song
        const optionsStore = useOptionsStore();
        const musicStore = useMusicStore();
        const weatherStore = useWeatherStore();
        optionsStore.$subscribe(() => {
            if (!(musicStore.isRandomGame && optionsStore.game == 'random') && musicStore.game != optionsStore.game) {
                musicStore.setGame(optionsStore.game);
            }
            if (!(musicStore.isRandomWeather && optionsStore.weather == 'random') && musicStore.weather != optionsStore.weather) {
                musicStore.setWeather(optionsStore.weather);
            }
            if (optionsStore.location.selection == Constants.Location.Disabled && optionsStore.weather == 'live') {
                optionsStore.weather = Constants.Weather.Sunny;
            }
            if (optionsStore.location.selection != weatherStore.mode) {
                if (weatherStore.mode == Constants.Location.Disabled) optionsStore.weather = 'live';
                weatherStore.setMode(optionsStore.location.selection);
            }
        });
        weatherStore.$subscribe(() => {
            if (optionsStore.weather == 'live' && musicStore.weather != weatherStore.weather) musicStore.setWeather(weatherStore.weather);
        });

        this.timeInterval = setInterval(() => this.updateTime(), 100);
        this.backgroundInterval = setInterval(() => this.updateBackground(), 1000);

        weatherStore.updateWeather();

        this.updateTime();
        this.updateBackground();
    },
    beforeUnmount() {
        if (this.timeInterval) clearInterval(this.timeInterval);
        if (this.backgroundInterval) clearInterval(this.backgroundInterval);
    },
    methods: {
        updateTime() {
            if (this.DEBUG) this.time += 60000;
            else this.time = Date.now();
        },
        // the backgrounds are powered by css transitions with js "guiding it along" with a new value every 1000ms
        updateBackground() {
            const progress = ((this.time - new Date().getTimezoneOffset() * 60 * 1000) % 86400000) / 864000;

            const sky = this.skyKeys.get(progress);
            const sun = this.sunKeys.get(progress);
            this.skyColor = `rgb(${sky.join(',')}`;
            this.sunColor = `rgba(${sun.join(',')}`;
        },
        click() {
            if (this.ready == 0) this.ready = 1;
            this.keepActive();
        },
        keepActive() {
            this.active = true;
            if (this.mousemoveTimeout) clearTimeout(this.mousemoveTimeout);
            this.mousemoveTimeout = setTimeout(() => (this.active = false), 3000);
        },
    },
});
</script>

<style scoped>
main {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 64px 6fr 1fr;
    grid-template-areas:
        'logo logo options'
        'clock clock clock'
        'weather player player';
}

.background {
    @apply fixed w-screen h-screen transition-colors duration-1000 ease-linear pointer-events-none;
}
</style>

<style>
body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

hr {
    @apply border-gray-300;
}

th,
tr:nth-child(even) {
    @apply bg-black bg-opacity-5;
}

th,
td {
    @apply border-r border-l p-1;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    @apply rounded-lg bg-gray-300;
}

::-webkit-scrollbar-thumb {
    @apply rounded-lg bg-gray-400;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s;
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
}
</style>
