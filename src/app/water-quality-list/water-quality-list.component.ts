import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WaterinfoService } from '../services/waterinfo.service';
import { ToastrService } from 'ngx-toastr';
import { ChartColumnFilter } from '../models/chart-column-filter';
import * as moment from 'moment';

@Component({
  selector: 'app-water-quality-list',
  templateUrl: './water-quality-list.component.html',
  styleUrls: ['./water-quality-list.component.css']
})
export class WaterQualityListComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  locationList = [];
  waterInfoList = [];

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

    this.waterInfoService.getWaterQualityList(this.chartColumnFilter).subscribe(
      data => {
        // console.log(data);
        this.waterInfoList = data;
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }



}
