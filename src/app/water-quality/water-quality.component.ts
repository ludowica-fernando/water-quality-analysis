import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WaterinfoService } from '../services/waterinfo.service';
import { ToastrService } from 'ngx-toastr';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { ChartColumn } from '../models/chart-column';
import * as moment from 'moment';

@Component({
  selector: 'app-water-quality',
  templateUrl: './water-quality.component.html',
  styleUrls: ['./water-quality.component.css']
})
export class WaterQualityComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  chartColumn: ChartColumn = new ChartColumn();
  locationList = [];
  waterValue : any;

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

    this.waterInfoService.calculateWaterQuality(this.chartColumnFilter).subscribe(
      data => {
        console.log(data);
        this.waterValue = data;
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }
}
