/*
    WARNING: This file is unfinished and goes unused.
    This is an older design of the time system that I decided to scrap.
    It's being committed just in case the concept will be reused later.
*/

import { defineStore } from 'pinia';

import { AmPm, StrongHour } from '~/lib';

type Callback = (hour: number) => void;

export const useTimeStore = defineStore('time', {
    actions: {
        _checkTime(firstRun = false) {
            const now = new Date();
            // const hour = now.getHours();
            const hour = (this.currentHour + 1) % 24;

            if (this.currentHour != hour) {
                console.log('[TimeKeeper] Hour is now', hour);
                this.currentHour = hour;
                if (!firstRun) this._emit(hour);
                else {
                    for (const callback of this.waitForStartCallbacks) callback(hour);
                    this.waitForStartCallbacks = [];
                }
            }

            const secondsToNextHour = 3600 - now.getMinutes() * 60 - now.getSeconds();
            const timeToNextCheck = Math.min(secondsToNextHour, 10) * 1000;
            setTimeout(() => this._checkTime(), timeToNextCheck);
        },
        _emit(hour: number) {
            for (const callback of this.callbacks) callback(hour);
        },
        start() {
            this.running = true;

            this._checkTime(true);
        },
        subscribe(callback: Callback) {
            this.callbacks.push(callback);
        },
        unsubscribe(callback: Callback) {
            this.callbacks = this.callbacks.filter((c) => c != callback);
        },
        waitForStart() {
            return new Promise<void>((resolve) => {
                if (this.running) resolve();
                else this.waitForStartCallbacks.push(() => resolve());
            });
        },
    },
    getters: {
        hour12(state) {
            return AmPm(StrongHour(state.currentHour));
        },
    },
    state: () => ({
        callbacks: [] as Callback[],
        currentHour: 0,
        running: false,
        waitForStartCallbacks: [] as Callback[],
    }),
});
