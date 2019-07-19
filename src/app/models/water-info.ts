import { Location } from './location';

export class WaterInfo {
    id: number;
    coliform: number;
    colour: number;
    eColi: number;
    ec: number;
    pH: number;
    rcl: number;
    turbidity: number;
    //date: Date;
    date : string;
    location: Location = new Location();

    constructor() {
        this.id = null;
        this.coliform = null;
        this.colour = null;
        this.eColi = null;
        this.ec = null;
        this.pH = null;
        this.rcl = null;
        this.turbidity = null;
        this.date = null;
    }
}