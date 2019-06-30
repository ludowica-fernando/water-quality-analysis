import { WaterInfo } from './water-info';

export class Location {
    id: number;
    name: string;
    city: string;
    latitude: number;
    longitude: number;
    waterInfoSet: WaterInfo[] = [];

    constructor() {
        this.id = null;
        this.name = null;
        this.city = null;
        this.latitude = null;
        this.longitude = null;
    }
}