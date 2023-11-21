<template>
    <div>
        <h2>Options</h2>
        <hr />

        <h3>Still under active development!</h3>
        <p>Missing features from the extension will be added soon.</p>

        <h3>Volume</h3>
        <p>Adjust the volume that the app's music plays at</p>
        <div class="flex items-center">
            <input type="range" min="0" max="1" step="0.01" :value="options.volume" @change="saveVolume" />
            <input type="number" min="0" max="100" step="1" :value="Math.round(options.volume * 100)" class="ml-2 w-[42px]" @change="saveVolumeV" />
            <span>%</span>
        </div>

        <h3>Music</h3>
        <p>Select which game's music you wish to listen to</p>
        <div v-for="game in Games" :key="game.id" class="radio">
            <input :id="game.id" v-model="options.game" type="radio" :value="game.id" />
            <label :for="game.id">{{ game.name }}</label>
        </div>
        <div class="radio">
            <input id="game-random" v-model="options.game" type="radio" value="random" />
            <label for="game-random">Random!</label>
        </div>

        <h3>Weather</h3>
        <p>Select the weather variation you wish to listen to</p>
        <div v-for="weather in Weathers" :key="weather.id" class="radio">
            <input :id="weather.id" v-model="options.weather" type="radio" :value="weather.id" />
            <label :for="weather.id">{{ weather.name }}</label>
        </div>
        <div class="radio">
            <input id="weather-random" v-model="options.weather" type="radio" value="random" />
            <label for="weather-random">Random!</label>
        </div>
    </div>
</template>

<script lang="ts">
import { Constants } from '~/lib';

export default defineComponent({
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
    },
    methods: {
        saveVolume(event: Event) {
            const volume = Number((event.target as HTMLInputElement).value);
            if (!isNaN(volume)) this.options.volume = volume;
        },
        saveVolumeV(event: Event) {
            const volume = Number((event.target as HTMLInputElement).value) / 100;
            if (!isNaN(volume)) this.options.volume = volume;
        },
    },
});
</script>
