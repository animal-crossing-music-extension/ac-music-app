<template>
    <div>
        <h2>Location</h2>
        <hr />

        <p>
            The app can determine the current weather for your location using this feature. You can also optionally have the music synchronise to the
            current weather.
        </p>

        <h3>Your Location</h3>
        <AppLink v-if="options.location.selection != 'disabled'" :href="mapLink()">View your selected location on Google Maps</AppLink>

        <div class="option">
            <input id="location-disabled" v-model="options.location.selection" type="radio" value="disabled" />
            <label for="location-disabled">Disabled</label>
        </div>

        <div class="option">
            <input
                id="location-automatic"
                v-model="options.location.selection"
                type="radio"
                value="automatic"
                :disabled="automaticModeState != 'on'"
            />
            <label for="location-automatic">Automatic</label>
        </div>
        <div class="suboption">
            <div v-if="automaticModeState == 'pending'" class="flex items-center gap-2">
                <Icon name="svg-spinners:6-dots-scale" />
                <p>Waiting for permission...</p>
            </div>
            <div v-if="automaticModeState == 'error'" class="flex items-center gap-2">
                <Icon name="octicon:x" class="text-red-600" size="24" />
                <div>
                    <p>Error: Could not get your location.</p>
                    <p>Have you blocked location permissions?</p>
                </div>
            </div>
            <div v-if="automaticModeState == 'on'" class="flex items-center gap-1">
                <Icon name="octicon:check" class="text-green-600" />
                <p>Location access has been granted.</p>
            </div>
            <AppButton
                v-if="automaticModeState == 'off' || automaticModeState == 'error'"
                content="Click here to turn on location access"
                size="sm"
                @click="turnOnAutomaticMode"
            />
        </div>

        <div class="option">
            <input
                id="location-manual"
                v-model="options.location.selection"
                type="radio"
                value="manual"
                :disabled="options.location.manualName.id == -1"
            />
            <label for="location-manual">Manual (Name)</label>
        </div>
        <div class="option suboption">
            <label>Location Name:</label>
            <input v-model="options.location.manualName.search" type="text" placeholder="Location Name" @input="searchName" />
        </div>
        <div class="suboption">
            <div v-if="searchResults?.length == 0" class="flex items-center gap-1">
                <Icon name="octicon:x" />
                <p>No results found.</p>
            </div>
            <div v-else-if="searching" class="flex items-center gap-2">
                <Icon name="svg-spinners:6-dots-scale" />
                <p>Searching...</p>
            </div>
            <table v-else-if="searchResults" class="w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(location, i) in searchResults" :key="location.id">
                        <td class="option">
                            <input
                                :id="location.id + ''"
                                v-model="options.location.manualName.id"
                                type="radio"
                                :value="location.id"
                                @change="() => nameChange(i)"
                            />
                            <label :for="location.id + ''">{{ location.name }}</label>
                        </td>
                        <td>{{ location.country }}</td>
                        <td>
                            {{ [location.admin1, location.admin2, location.admin3, location.admin4].filter((v) => v).join(', ') }}
                            <AppLink :href="mapLink(location.latitude, location.longitude)">(View)</AppLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="option">
            <input id="location-manual-latlong" v-model="options.location.selection" type="radio" value="manual-latlong" />
            <label for="location-manual-latlong">Manual (Latitude and Longitude)</label>
        </div>
        <div class="option suboption">
            <label>Latitude:</label>
            <input
                ref="latitude"
                :value="options.location.manualLatLong.latitude"
                type="number"
                placeholder="Latitude"
                max="90"
                min="-90"
                @input="() => latlongInput('latitude')"
                @change="latlongChange"
            />
        </div>
        <div class="option suboption">
            <label>Longitude:</label>
            <input
                ref="longitude"
                :value="options.location.manualLatLong.longitude"
                type="number"
                placeholder="Longitude"
                max="90"
                min="-90"
                @input="() => latlongInput('longitude')"
                @change="latlongChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Constants, Weather } from '~/lib';

type AutomaticModeState = 'off' | 'pending' | 'error' | 'on';

export default defineComponent({
    data(): {
        options: ReturnType<typeof useOptionsStore>;
        weather: ReturnType<typeof useWeatherStore>;

        automaticModeState: AutomaticModeState;
        searching: boolean;
        searchResults: Weather.LocationSearchResult[] | null;
    } {
        return {
            options: useOptionsStore(),
            weather: useWeatherStore(),

            automaticModeState: 'off',
            searching: false,
            searchResults: null,
        };
    },
    async mounted() {
        if (this.options.location.manualName.name != '') {
            this.options.location.manualName.search = this.options.location.manualName.name;
            this.searchName();
        }

        const permission = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state == 'granted') this.automaticModeState = 'on';
    },
    methods: {
        mapLink(latitude?: number, longitude?: number) {
            return `https://www.google.com/maps/search/${latitude ?? this.weather.coords.latitude},${longitude ?? this.weather.coords.longitude}`;
        },
        updateWeather(mode: Constants.Location) {
            if (mode == this.weather.mode) this.weather.updateWeather();
        },
        turnOnAutomaticMode() {
            this.automaticModeState = 'pending';

            navigator.geolocation.getCurrentPosition(
                () => {
                    this.updateWeather(Constants.Location.Automatic);
                    this.automaticModeState = 'on';
                },
                () => (this.automaticModeState = 'error'),
            );
        },
        async searchName() {
            this.searching = true;
            this.searchResults = null;
            const search = this.options.location.manualName.search + '';
            const results = await Weather.searchLocation(search);

            if (search == this.options.location.manualName.search) {
                this.searchResults = results || [];
                this.searching = false;
            }
        },
        nameChange(index: number) {
            const location = this.searchResults?.[index];
            if (!location) return;

            this.options.location.manualName.id = location.id;
            this.options.location.manualName.name = location.name;
            this.options.location.manualName.latitude = location.latitude;
            this.options.location.manualName.longitude = location.longitude;

            this.updateWeather(Constants.Location.Manual); // call it manually since we don't watch for name changes
        },
        latlongInput(target: 'latitude' | 'longitude') {
            const el = this.$refs[target] as HTMLInputElement;
            const value = Math.min(Math.max(parseFloat(el.value), -90), 90);
            el.value = value.toString();
            this.options.location.manualLatLong[target] = value;
        },
        latlongChange() {
            this.updateWeather(Constants.Location.ManualLatLong); // call it manually since we don't watch for lat/long changes
        },
    },
});
</script>
