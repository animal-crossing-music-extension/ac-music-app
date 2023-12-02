<template>
    <div>
        <h2>Options</h2>
        <hr />

        <h3>Still under active development!</h3>
        <p>Missing features from the extension will be added soon.</p>

        <h3>Volume</h3>
        <p>Adjust the volume that the app's music plays at</p>
        <div class="flex items-center">
            <input type="range" min="0" max="100" step="1" :value="volumeV" @change="saveVolume" />
            <input
                ref="volume"
                type="number"
                min="0"
                max="100"
                step="1"
                :value="volumeV"
                class="ml-2 w-[42px]"
                @input="inputVolume"
                @change="saveVolume"
            />
            <span>%</span>
        </div>

        <h3>Music</h3>
        <p>Select which game's music you wish to listen to</p>
        <div v-for="game in Games" :key="game.id" class="option">
            <input :id="game.id" v-model="options.game" type="radio" :value="game.id" />
            <label :for="game.id">{{ game.name }}</label>
        </div>
        <div class="option">
            <input id="game-random" v-model="options.game" type="radio" value="random" />
            <label for="game-random">Random!</label>
        </div>

        <h3>Weather</h3>
        <p>Select the weather variation you wish to listen to</p>
        <div class="option" @click="clickLive">
            <input id="weather-live" v-model="options.weather" :disabled="!isLiveAllowed" type="radio" value="live" />
            <label for="weather-live">Live (based on location)</label>
        </div>
        <div v-for="weather in Weathers" :key="weather.id" class="option">
            <input :id="weather.id" v-model="options.weather" type="radio" :value="weather.id" />
            <label :for="weather.id">{{ weather.name }}</label>
        </div>
        <div class="option">
            <input id="weather-random" v-model="options.weather" type="radio" value="random" />
            <label for="weather-random">Random!</label>
        </div>
    </div>
</template>

<script lang="ts">
import { Constants } from '~/lib';

export default defineComponent({
    emits: ['selected'],
    data() {
        return {
            options: useOptionsStore(),
        };
    },
    computed: {
        Games() {
            return Constants.Games;
        },
        Weathers() {
            return Constants.Weathers;
        },
        isLiveAllowed() {
            return this.options.location.selection != Constants.Location.Disabled;
        },
        volumeV() {
            return Math.round(this.options.volume * 100);
        },
    },
    methods: {
        parseVolume(target: HTMLInputElement) {
            const volume = Number(target.value);
            if (isNaN(volume)) return null;
            return Math.min(Math.max(volume, 0), 100);
        },
        saveVolume(event: Event) {
            const volume = this.parseVolume(event.target as HTMLInputElement);
            if (volume != null) this.options.volume = Number((volume / 100).toFixed(2));
        },
        inputVolume() {
            const el = this.$refs.volume as HTMLInputElement;
            const volume = this.parseVolume(el);
            if (volume != null) el.value = String(volume);
        },
        clickLive() {
            if (!this.isLiveAllowed) this.$emit('selected', Constants.OptionsPage.Location);
        },
    },
});
</script>
