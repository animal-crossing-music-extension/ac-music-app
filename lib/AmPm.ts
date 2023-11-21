import type { Constants } from '~/lib';

export default function (strongHour: Constants.Hour) {
    const hour = Number(strongHour);
    if (hour < 12) return `${hour % 12 || 12}am`;
    return `${hour % 12 || 12}pm`;
}
