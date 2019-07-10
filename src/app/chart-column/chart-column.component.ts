import { Component, OnInit } from '@angular/core';
import { WaterinfoService } from '../services/waterinfo.service';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { ChartColumn } from '../models/chart-column';
import * as moment from 'moment';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chart-column',
  templateUrl: './chart-column.component.html',
  styleUrls: ['./chart-column.component.css']
})
export class ChartColumnComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  chartColumn: ChartColumn = new ChartColumn();
  locationList = [];
  data: any[] = [];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Percentage';
  showYAxisLabel = true;
  yAxisLabel = 'Parameter';

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

    this.waterInfoService.getChartColumn(this.chartColumnFilter).subscribe(
      data => {
        this.chartColumn = data;
        this.prepare();
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }

  prepare() {

    this.data.push({ name: "colour", value: this.chartColumn.colour });
    this.data.push({ name: "pH", value: this.chartColumn.pH });
    this.data.push({ name: "rcl", value: this.chartColumn.rcl });
    this.data.push({ name: "turbidity", value: this.chartColumn.turbidity });

    this.data = [...this.data];
  }

}
