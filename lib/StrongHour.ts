import { Constants } from '~/lib';

export default function (time: number): Constants.Hour {
    const hour = new Date(time).getHours();
    switch (hour) {
        case 0:
            return '00';
        case 1:
            return '01';
        case 2:
            return '02';
        case 3:
            return '03';
        case 4:
            return '04';
        case 5:
            return '05';
        case 6:
            return '06';
        case 7:
            return '07';
        case 8:
            return '08';
        case 9:
            return '09';
        case 10:
            return '10';
        case 11:
            return '11';
        case 12:
            return '12';
        case 13:
            return '13';
        case 14:
            return '14';
        case 15:
            return '15';
        case 16:
            return '16';
        case 17:
            return '17';
        case 18:
            return '18';
        case 19:
            return '19';
        case 20:
            return '20';
        case 21:
            return '21';
        case 22:
            return '22';
        case 23:
            return '23';
        default:
            throw new Error(`Invalid hour: ${hour}`);
    }
}
