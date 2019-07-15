export class ChartLine {
    public colour: Array<number> = [];
    public turbidity: Array<number> = [];
    public pH: Array<number> = [];
    public rcl: Array<number> = [];
    public date: Array<Date> = [];
    
    total : number;

    constructor() {
        this.colour = [];
        this.turbidity = [];
        this.pH = [];
        this.rcl = [];
        this.date = [];
        this.total = null;
    }
}