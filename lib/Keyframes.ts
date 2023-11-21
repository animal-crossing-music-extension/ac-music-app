export default class Keyframes {
    private keyframes;

    constructor(keyframes: Record<number, number[]>) {
        this.keyframes = keyframes;
    }

    private interpolate(a: number[], b: number[], percent: number) {
        return a.map((value, index) => value + (b[index] - value) * percent);
    }

    get(percentage: number) {
        const keys = Object.keys(this.keyframes).map((key) => Number(key));
        keys.sort((a, b) => a - b);

        let lastKey = keys[0];
        for (let i = 1; i < keys.length; i++) {
            const key = keys[i];
            if (percentage < key) return this.interpolate(this.keyframes[lastKey], this.keyframes[key], (percentage - lastKey) / (key - lastKey));
            lastKey = key;
        }

        return this.keyframes[lastKey];
    }
}
