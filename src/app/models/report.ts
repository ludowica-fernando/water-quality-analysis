export class Report {
    city: number;
    dateStart: string;
    dateEnd: string;
    waterQuality: number;
    colour: number;
    turbidity: number;
    pH: number;
    rcl: number;

    constructor() {
        this.city = null;
        this.dateStart = null;
        this.dateEnd = null;
        this.waterQuality = null;
        this.colour = null;
        this.turbidity = null;
        this.pH = null;
        this.rcl = null;
    }
}