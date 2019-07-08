import { WaterQuality } from './../models/water-quality';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WaterinfoService } from '../services/waterinfo.service';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { ChartColumn } from '../models/chart-column';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-line-chart-water-quality',
  templateUrl: './line-chart-water-quality.component.html',
  styleUrls: ['./line-chart-water-quality.component.css']
})

export class LineChartWaterQualityComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  chartColumn: ChartColumn = new ChartColumn();
  locationList = [];
  data: any[] = [];
  view: any[] = [700, 400];
  waterQualityList: WaterQuality[] = [];

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
    let o = {
      name: "Colombo",
      value: 25
    };

    let o2 = {
      name: "Negombo",
      value: 50
    };

    this.data.push(o);

    this.data = [...this.data];
  }
}