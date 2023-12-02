import { Constants } from '~/lib';

export type WeatherResponse = {
    current: {
        temperature_2m: number;
        time: string;
        weather_code: number;
    };
    current_units: {
        temperature_2m: string;
    };
    daily: {
        sunrise: string[];
        sunset: string[];
    };
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
};
export type LocationSearchResult = {
    country: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    admin1?: string;
    admin2?: string;
    admin3?: string;
    admin4?: string;
};
type LocationSearchResponse = {
    results?: LocationSearchResult[];
};

export async function fetchWeather(latitude: number, longitude: number, units: 'celsius' | 'fahrenheit') {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', latitude.toString());
    url.searchParams.set('longitude', longitude.toString());
    url.searchParams.set('current', 'temperature_2m,weather_code');
    url.searchParams.set('daily', 'sunrise,sunset');
    url.searchParams.set('timezone', 'GMT');
    url.searchParams.set('forecast_days', '1');
    url.searchParams.set('temperature_unit', units);

    const response = await fetch(url);
    const data = (await response.json()) as WeatherResponse;
    return data;
}

export async function searchLocation(search: string) {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.set('name', search);
    url.searchParams.set('count', '10');
    url.searchParams.set('language', 'en');
    url.searchParams.set('format', 'json');

    const response = await fetch(url);
    const data = (await response.json()) as LocationSearchResponse;
    return data.results;
}

export async function getCoords() {
    const options = useOptionsStore();
    const mode = options.location.selection;

    switch (mode) {
        case Constants.Location.Automatic: {
            const permission = await navigator.permissions.query({ name: 'geolocation' });
            if (permission.state != 'granted') {
                options.location.selection = Constants.Location.Disabled;
                return;
            }

            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }).catch(() => undefined);
            if (!position) return;

            const { latitude, longitude } = position.coords;
            return { latitude, longitude };
        }
        case Constants.Location.Manual: {
            return options.location.manualName;
        }
        case Constants.Location.ManualLatLong: {
            return options.location.manualLatLong;
        }
    }
}

export function getUnits() {
    const options = useOptionsStore();
    switch (options.temperatureUnits) {
        case Constants.TemperatureUnits.Metric:
            return 'celsius';
        case Constants.TemperatureUnits.Imperial:
            return 'fahrenheit';
    }
}
