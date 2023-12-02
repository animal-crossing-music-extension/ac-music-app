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
        location: {
            manualLatLong: {
                latitude: number;
                longitude: number;
            };
            manualName: {
                id: number;
                latitude: number;
                longitude: number;
                name: string;
                search: string;
            };
            selection: Constants.Location;
        };
        volume: number;
        weather: Constants.Weather | 'random' | 'live';
    } => ({
        game: Constants.Game.NH,
        location: {
            manualLatLong: {
                latitude: 0,
                longitude: 0,
            },
            manualName: {
                id: 0,
                latitude: 0,
                longitude: 0,
                name: '',
                search: '',
            },
            selection: Constants.Location.Disabled,
        },
        volume: 0.5,
        weather: Constants.Weather.Sunny,
    }),
});
