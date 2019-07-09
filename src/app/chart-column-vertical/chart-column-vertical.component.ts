import { WaterQuality } from '../models/water-quality';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chart-column-vertical',
  templateUrl: './chart-column-vertical.component.html',
  styleUrls: ['./chart-column-vertical.component.css']
})

export class ChartColumnVertical implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  waterQualityList: WaterQuality[] = [];
  cityList = [];
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(data => {
      let locationList = data;

      locationList.forEach(location => this.cityList.push(location.city));
      this.cityList = Array.from(new Set(this.cityList));
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

    this.locationService.getWaterQualityByCityAndDate(this.chartColumnFilter).subscribe(
      data => {
        this.waterQualityList = data;
        this.prepare();
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }

  prepare() {
    this.waterQualityList.forEach(waterQuality => {
      let waterData = {
        name: waterQuality.name,
        value: waterQuality.percentage
      };
      this.data.push(waterData);
    });
    this.data = [...this.data];
  }
}