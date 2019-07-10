import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WaterinfoService } from '../services/waterinfo.service';
import { ToastrService } from 'ngx-toastr';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { ChartColumn } from '../models/chart-column';
import * as moment from 'moment';
import { WaterQuality } from '../models/water-quality';

@Component({
  selector: 'app-water-quality',
  templateUrl: './water-quality.component.html',
  styleUrls: ['./water-quality.component.css']
})
export class WaterQualityComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  chartColumn: ChartColumn = new ChartColumn();
  cityList = [];
  waterQualityList: WaterQuality[] = [];

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
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }
}
