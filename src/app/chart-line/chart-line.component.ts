import { ChartLine } from './../models/chart-line';
import { Component, OnInit } from '@angular/core';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { LocationService } from '../services/location.service';
import { WaterinfoService } from '../services/waterinfo.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})
export class ChartLineComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  chartLine: ChartLine = new ChartLine();
  locationList = [];
  data: any[] = [];
  view: any[] = [700, 400];
  selectedParameter: string = 'pH'

  location: Location = new Location();

  historyData: any[] = [];

  // options
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Percentage';
  // showYAxisLabel = true;
  // yAxisLabel = 'Parameter';

  showXAxis = true;
  showYAxis = true;
  showDataLabel = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Value';

  // line, area
  autoScale = true;

  constructor(
    private locationService: LocationService,
    private waterInfoService: WaterinfoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(data => {
      this.locationList = data;
    });
  }

  onSubmit() {
    this.chartColumnFilter.city;

    let _dateStart = this.chartColumnFilter.dateStart;
    let _dateEnd = this.chartColumnFilter.dateEnd;

    let dateStart = moment(_dateStart, 'YYYY-MM-DDTHH:mm').format('DD-MM-YYYY HH:mm:ss');
    let dateEnd = moment(_dateEnd, 'YYYY-MM-DDTHH:mm').format('DD-MM-YYYY HH:mm:ss');

    this.chartColumnFilter.dateStart = dateStart;
    this.chartColumnFilter.dateEnd = dateEnd;

    this.waterInfoService.getChartLine(this.chartColumnFilter).subscribe(
      data => {
        this.chartLine = data;
        console.log(data);
        this.prepare();
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }

  prepare() {

    this.data.push({ name: "colour", value: this.chartLine.colour });
    this.data.push({ name: "pH", value: this.chartLine.pH });
    this.data.push({ name: "rcl", value: this.chartLine.rcl });
    this.data.push({ name: "turbidity", value: this.chartLine.turbidity });

    this.data = [...this.data];
  }

}
