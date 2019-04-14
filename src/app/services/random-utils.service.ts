import { Injectable } from '@angular/core';

@Injectable()
export class RandomUtilsService {
    constructor() {

    }

    public randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}