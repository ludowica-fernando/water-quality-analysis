export class WaterInfo {
    id: number;
    hw: number;
    rci: number;
    date: Date;
    location: Location = new Location();

    constructor() {
        this.id = null;
        this.hw = null;
        this.rci = null;
        this.date = null;
    }
}