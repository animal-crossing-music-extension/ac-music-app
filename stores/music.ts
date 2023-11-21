import { defineStore } from 'pinia';

import { Constants, Random } from '~/lib';

function setOptionGame(game: Constants.Game | 'random') {
    return game == 'random' ? Random.fromArray(Constants.Games.map((g) => g.id)) : game;
}
function setOptionWeather(game: Constants.Weather | 'random') {
    return game == 'random' ? Random.fromArray(Constants.Weathers.map((g) => g.id)) : game;
}

/*
    This store tracks the state of what the user is actually listening to.
    If the user has selected the options "random" or "live", these are not actual values the user can be listening to, they are merely options.
    Hence this store is an additional layer which determines what the user will actually be listening to.
*/
export const useMusicStore = defineStore('music', {
    actions: {
        setGame(game: Constants.Game | 'random') {
            this.game = setOptionGame(game);
            this.isRandomGame = game == 'random';
        },
        setWeather(weather: Constants.Weather | 'random') {
            this.weather = setOptionWeather(weather);
            this.isRandomWeather = weather == 'random';
        },
    },
    persist: {
        storage: !process.server ? localStorage : undefined,
    },
    state: (): {
        game: Constants.Game;
        isRandomGame: boolean;
        isRandomWeather: boolean;
        weather: Constants.Weather;
    } => {
        const options = useOptionsStore();

        return {
            game: setOptionGame(options.game),
            isRandomGame: options.game == 'random',
            isRandomWeather: options.weather == 'random',
            weather: setOptionWeather(options.weather),
        };
    },
});
