import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  // mapCenter = [80.0087746, 6.901608599999999];
  mapCenter: number[] = [];
  // basemapType = 'gray';
  basemapType = 'streets';
  mapZoomLevel = 10;

  constructor() { }

  ngOnInit() {
    this.findMe();
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.mapCenter.push(position.coords.longitude);
        this.mapCenter.push(position.coords.latitude);
        console.log(this.mapCenter);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

}
