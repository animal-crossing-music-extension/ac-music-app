import { defineStore } from 'pinia';

import { Constants } from '~/lib';

/*
    This store is persistent in the client, saving all of the user's options.
    The values for the game and music are different from the what the user is actually listening to, see the music store.
*/
export const useOptionsStore = defineStore('options', {
    persist: {
        storage: !process.server ? localStorage : undefined,
    },
    state: (): {
        game: Constants.Game | 'random';
        volume: number;
        weather: Constants.Weather | 'random';
    } => ({
        game: Constants.Game.NH,
        volume: 1,
        weather: Constants.Weather.Sunny,
    }),
});
