import { ChartPie } from './../models/chart-pie';
import { WaterinfoService } from './../services/waterinfo.service';
import { Component, OnInit } from '@angular/core';
import { ChartColumnFilter } from '../models/chart-column-filter';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  chartColumnFilter: ChartColumnFilter = new ChartColumnFilter();
  chartPie: ChartPie = new ChartPie();
  cityList = [];
  data: any[] = [];

  view: any[] = [700, 400];

  constructor(
    private locationService: LocationService,
    private waterInfoService: WaterinfoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(data => {
      // let locationList = data;

      // locationList.forEach(location => this.cityList.push(location.city));
      // this.cityList = Array.from(new Set(this.cityList));
      this.cityList = data;
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

    this.waterInfoService.getChartPie(this.chartColumnFilter).subscribe(
      data => {
        console.log(data);
        this.chartPie = data;
        this.prepare();
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }

  prepare() {
    
    this.data = [];
    this.data.push({ name: "colour", value: this.chartPie.colour });
    this.data.push({ name: "pH", value: this.chartPie.pH });
    this.data.push({ name: "rcl", value: this.chartPie.rcl });
    this.data.push({ name: "turbidity", value: this.chartPie.turbidity });
    this.data.push({ name: "ec", value: this.chartPie.ec });
    // this.data.push({ name: "total", value: this.chartPie.total });

    this.data = [...this.data];
  }

}
