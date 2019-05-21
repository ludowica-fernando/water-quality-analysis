import { Component, OnInit } from '@angular/core';
import { WaterinfoService } from '../services/waterinfo.service';

@Component({
  selector: 'app-water-info-list',
  templateUrl: './water-info-list.component.html',
  styleUrls: ['./water-info-list.component.css']
})
export class WaterInfoListComponent implements OnInit {

  constructor(private waterInfoService: WaterinfoService) { }

  ngOnInit() {
    this.getWaterInfo();
  }

  getWaterInfo() {
    this.waterInfoService.getAll().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
