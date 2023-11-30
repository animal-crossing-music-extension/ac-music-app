import { Constants, Weather } from '~/lib';

export const useWeatherStore = defineStore('weather', {
    actions: {
        setMode(mode: Constants.Location) {
            this.mode = mode;
            return this.updateWeather();
        },
        async updateWeather() {
            const coords = await Weather.getCoords();
            if (!coords) {
                this.fetched = true;
                return;
            }
            this.coords = coords;
            const { latitude, longitude } = coords;

            const weather = await Weather.fetchWeather(latitude, longitude);
            if (!weather) {
                this.fetched = true;
                return;
            }

            this.code = weather.current.weather_code;
            this.temperature = `${weather.current.temperature_2m}${weather.current_units.temperature_2m}`;
            this.sunrise = new Date(weather.daily.sunrise[0]).getTime();
            this.sunset = new Date(weather.daily.sunset[0]).getTime();
            this.fetched = true;

            const timeoutTime = new Date(weather.current.time).getTime() + 1000 * 60 * 15 - Date.now() + 1000 * 10; // add 10 seconds to give the API time to update (or to avoid spamming it)
            if (this.updateTimeout) clearTimeout(this.updateTimeout);
            this.updateTimeout = setTimeout(() => {
                this.updateWeather().catch(() => undefined);
            }, timeoutTime);
        },
    },
    getters: {
        icon(state) {
            switch (this.isDay) {
                case true:
                    switch (state.code) {
                        case 0:
                            return 'wi:day-sunny';
                        case 1:
                            return 'wi:day-sunny-overcast';
                        case 2:
                            return 'wi:day-cloudy';
                        case 51:
                        case 56:
                            return 'wi:day-sprinkle';
                        case 61:
                        case 66:
                            return 'wi:day-rain';
                        case 71:
                        case 85:
                            return 'wi:day-snow';
                        case 80:
                        case 81:
                        case 82:
                            return 'wi:day-showers';
                        case 95:
                            return 'wi:day-thunderstorm';
                        case 96:
                        case 99:
                            return 'wi:day-snow-thunderstorm';
                    }
                    break;
                case false:
                    switch (state.code) {
                        case 0:
                            return 'wi:night-clear';
                        case 1:
                            return 'wi:night-alt-partly-cloudy';
                        case 2:
                            return 'wi:night-alt-cloudy';
                        case 51:
                        case 56:
                            return 'wi:night-alt-sprinkle';
                        case 61:
                        case 66:
                            return 'wi:night-alt-rain';
                        case 71:
                        case 85:
                            return 'wi:night-alt-snow';
                        case 80:
                        case 81:
                        case 82:
                            return 'wi:night-alt-showers';
                        case 95:
                            return 'wi:night-alt-thunderstorm';
                        case 96:
                        case 99:
                            return 'wi:night-alt-snow-thunderstorm';
                    }
                    break;
            }

            switch (state.code) {
                case 3:
                    return 'wi:cloudy';
                case 45:
                case 48:
                    return 'wi:fog';
                case 55:
                case 53:
                case 57:
                    return 'wi:sprinkle';
                case 63:
                case 65:
                case 67:
                    return 'wi:rain';
                case 73:
                case 75:
                case 77:
                case 86:
                    return 'wi:snow';
            }
        },
        isDay(): boolean {
            const now = new Date();
            return now.getTime() >= this.sunrise && now.getTime() <= this.sunset;
        },
        weather(state): Constants.Weather {
            // https://open-meteo.com/en/docs
            switch (state.code) {
                case 0: // clear sky
                case 1: // mainly clear
                case 2: // partly cloudy
                case 3: // overcast
                    return Constants.Weather.Sunny;
                case 45: // fog
                case 48: // depositing rime fog
                case 51: // light drizzle
                case 53: // moderate drizzle
                case 55: // dense drizzle
                case 56: // light freezing drizzle
                case 57: // dense freezing drizzle
                case 61: // slight rain
                case 63: // moderate rain
                case 65: // heavy rain
                case 66: // light freezing rain
                case 67: // heavy freezing rain
                case 80: // slight rain showers
                case 81: // moderate rain showers
                case 82: // violent rain showers
                case 95: // thunderstorm
                case 96: // thunderstorm with slight hail
                case 99: // thunderstorm with heavy hail
                    return Constants.Weather.Raining;
                case 71: // slight snowfall
                case 73: // moderate snowfall
                case 75: // heavy snowfall
                case 77: // snow grains
                case 85: // slight snow showers
                case 86: // heavy snow showers
                    return Constants.Weather.Snowing;
                default:
                    return Constants.Weather.Sunny;
            }
        },
    },
    state: (): {
        code: number;
        coords: { latitude: number; longitude: number };
        fetched: boolean;
        mode: Constants.Location;
        sunrise: number;
        sunset: number;
        temperature: string;

        updateTimeout: NodeJS.Timeout | null;
    } => {
        const now = new Date();
        const sunrise = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 30, 0);
        const sunset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0);

        return {
            code: 0,
            coords: { latitude: 0, longitude: 0 },
            fetched: false,
            mode: Constants.Location.Disabled,
            sunrise: sunrise.getTime(), // currently unused
            sunset: sunset.getTime(), // currently unused
            temperature: '',

            updateTimeout: null,
        };
    },
});
