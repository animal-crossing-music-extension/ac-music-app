export enum Game {
    AC = 'ac',
    NH = 'nh',
    NL = 'nl',
    WW = 'ww',
}
export const Games: { id: Game; name: string }[] = [
    { id: Game.AC, name: 'Animal Forest/Animal Crossing' },
    { id: Game.WW, name: "Wild World/City Folk/Let's Go to the City" },
    { id: Game.NL, name: 'New Leaf' },
    { id: Game.NH, name: 'New Horizons' },
];

export enum Weather {
    Raining = 'raining',
    Snowing = 'snowing',
    Sunny = 'sunny',
}
export const Weathers: { id: Weather; name: string }[] = [
    { id: Weather.Sunny, name: 'Sunny/Normal' },
    { id: Weather.Raining, name: 'Raining' },
    { id: Weather.Snowing, name: 'Snowing' },
];

export type Hour =
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23';

const DAY = [72, 128, 250];
const NIGHT = [7, 10, 60];
export const SkyColors = {
    0: NIGHT,
    100: NIGHT,
    25: NIGHT,
    38: DAY,
    71: DAY,
    79: NIGHT,
};

export const SunColors = {
    0: [0, 0, 0, 0],
    100: [0, 0, 0, 0],
    18: [0, 0, 0, 0],
    21: [0, 128, 0, 0.2],
    30: [0, 128, 0, 0.2],
    50: [0, 0, 0, 0],
    72: [0, 0, 0, 0],
    77: [250, 120, 0, 0.4],
    81: [250, 80, 0, 0.2],
    86: [0, 0, 0, 0],
};

export enum OptionsPage {
    About = 'about',
    Location = 'live-weather',
    Options = 'options',
}
export const OptionsPages: { id: OptionsPage; name: string }[] = [
    { id: OptionsPage.Options, name: 'Options' },
    { id: OptionsPage.Location, name: 'Location' },
    { id: OptionsPage.About, name: 'About' },
];

export enum Location {
    Automatic = 'automatic',
    Disabled = 'disabled',
    Manual = 'manual',
    ManualLatLong = 'manual-latlong',
}
