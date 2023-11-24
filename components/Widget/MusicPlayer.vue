<template>
    <div>
        <p v-if="debug">{{ hour }}</p>
        <Transition>
            <!-- Have the loading always appear on top, so it can be seen while the options menu is open -->
            <div v-if="loading" class="relative">
                <p class="z-10 font-bold animate-pulse-color">Loading music...</p>
            </div>
        </Transition>
        <audio ref="audio" :src="src" loop :controls="debug" />
    </div>
</template>

<script lang="ts">
import { bool, number } from 'vue-types';
import { AmPm, Constants, StrongHour } from '~/lib';

export default defineComponent({
    props: {
        time: number().isRequired,
        debug: bool().def(false),
    },
    data(): {
        optionsStore: ReturnType<typeof useOptionsStore>;
        musicStore: ReturnType<typeof useMusicStore>;

        switchSongsCallbacks: (() => void)[];
        waitingToPlay: boolean;
        loading: boolean;
        loopTimeout: NodeJS.Timeout | null;

        hour: Constants.Hour;
        game: Constants.Game;
        weather: Constants.Weather;
    } {
        const optionsStore = useOptionsStore();
        const musicStore = useMusicStore();
        return {
            optionsStore,
            musicStore,

            switchSongsCallbacks: [], // we use this to queue up callbacks to run when we switch songs, in case the user switches a bunch of options too fast
            waitingToPlay: false,
            loading: false,
            loopTimeout: null,

            hour: '00',
            game: musicStore.game,
            weather: musicStore.weather,
        };
    },
    computed: {
        hourAmPm() {
            return AmPm(this.hour);
        },
        audio() {
            return this.$refs.audio as HTMLAudioElement;
        },
        src() {
            return `https://acmusic.app/music/${this.game}/${this.weather}/${this.hourAmPm}.ogg`;
        },
    },
    watch: {
        time() {
            const newHour = StrongHour(this.time);
            if (newHour != this.hour) this.switchSongs(() => (this.hour = newHour));
        },
    },
    mounted() {
        this.hour = StrongHour(this.time);
        this.game = this.musicStore.game;

        this.optionsStore.$subscribe(() => {
            console.debug('options store changed');
            if (this.switchSongsCallbacks.length == 0) this.audio.volume = this.optionsStore.volume;
        });

        this.musicStore.$subscribe(() => {
            console.debug('music store changed');
            if (this.musicStore.game != this.game) this.switchSongs(() => (this.game = this.musicStore.game));
            if (this.musicStore.weather != this.weather) this.switchSongs(() => (this.weather = this.musicStore.weather));
        });

        this.audio.addEventListener('play', () => {
            console.debug('play');
            this.setLoopTimes();
        });
        this.audio.addEventListener('pause', () => {
            console.debug('pause');
            if (this.loopTimeout) clearTimeout(this.loopTimeout);
        });
        this.audio.addEventListener('canplay', () => {
            console.debug('canplay');
            this.loading = false;
            if (this.waitingToPlay) this.playMusic();
        });
        this.audio.addEventListener('loadstart', () => {
            this.loading = true;
        });
        this.audio.addEventListener('waiting', () => {
            console.debug('waiting');
            // sometimes this can get fired when we loop the song even though it's already loaded, so we double check that we paused to load
            if (this.audio.paused) this.loading = true;
        });

        this.waitingToPlay = true;
    },
    methods: {
        playMusic() {
            this.loading = false;
            this.waitingToPlay = false;
            this.audio.volume = this.optionsStore.volume;
            this.audio.play();

            document.title = `${this.hourAmPm} - AC Music App`;
        },
        async switchSongs(callback: () => void) {
            this.switchSongsCallbacks.push(callback);
            if (this.switchSongsCallbacks.length > 1) return; // stop if we're already switching songs

            await this.fadeOut(3000);
            for (const callback of this.switchSongsCallbacks) callback();
            this.switchSongsCallbacks = [];
            this.waitingToPlay = true;
        },
        fadeOut(time: number) {
            return new Promise<void>((resolve) => {
                const stepAmount = this.audio.volume / (time / 100);
                const interval = setInterval(() => {
                    if (this.audio.volume > 0) this.audio.volume -= Math.min(stepAmount, this.audio.volume);
                    else {
                        clearInterval(interval);

                        // just in case we're about to continue playing the same song (user quickly switches back and forth)
                        this.audio.pause();
                        this.audio.currentTime = 0;

                        resolve();
                    }
                }, 100);
            });
        },
        setLoopTimes() {
            const loopTimes = Constants.LOOP_TIMES[this.game][Constants.Weather.Sunny]?.[this.hour];
            if (!loopTimes) return;

            const start = Number(loopTimes.start);
            const end = Number(loopTimes.end);
            if (this.loopTimeout) clearTimeout(this.loopTimeout);
            this.loopTimeout = setTimeout(
                () => {
                    this.audio.currentTime = start;
                    this.setLoopTimes();
                },
                (end - this.audio.currentTime) * 1000,
            );
        },
    },
});
</script>
