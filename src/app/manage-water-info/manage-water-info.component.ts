import { LocationService } from './../services/location.service';
import { WaterinfoService } from './../services/waterinfo.service';
import { Component, OnInit } from '@angular/core';
import { WaterInfo } from '../models/water-info';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-water-info',
  templateUrl: './manage-water-info.component.html',
  styleUrls: ['./manage-water-info.component.css']
})
export class ManageWaterInfoComponent implements OnInit {

  isReadOnly = true;
  id: string;
  waterInfo: WaterInfo = new WaterInfo();
  locationList = [];

  constructor(
    private route: ActivatedRoute,
    private waterInfoService: WaterinfoService,
    private locationService: LocationService,
    private toastr : ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.locationService.getAll().subscribe(data =>{
      this.locationList = data;
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.waterInfoService.get(this.id).subscribe((data: WaterInfo) => {

        console.log(data);
        this.waterInfo = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {
    this.waterInfoService.addOrUpdate(this.waterInfo).subscribe(data => {
      console.log(data);
      this.isReadOnly = true;
      this.toastr.success("Water quality data added!", "Success");
      this.router.navigateByUrl("/manage-water-info'/");
    });
  }

  edit() {
    this.isReadOnly = false;
  }

  compareByOptionId(idFirst, idSecond) {
    return idFirst && idSecond && idFirst.id == idSecond.id;
  }

}
