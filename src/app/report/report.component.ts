import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WaterinfoService } from '../services/waterinfo.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../models/report';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  
  locationList = [];
  report: Report = new Report();

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
    this.report.city;

    let _dateStart = this.report.dateStart;
    let _dateEnd = this.report.dateEnd;

    let dateStart = moment(_dateStart, 'YYYY-MM-DDTHH:mm').format('DD-MM-YYYY HH:mm:ss');
    let dateEnd = moment(_dateEnd, 'YYYY-MM-DDTHH:mm').format('DD-MM-YYYY HH:mm:ss');

    this.report.dateStart = dateStart;
    this.report.dateEnd = dateEnd;

    this.waterInfoService.getReportData(this.report).subscribe(
      data => {
        this.report = data;
      },
      error => {
        this.toastr.error("Not Found!", "Error");
      });
  }

}
