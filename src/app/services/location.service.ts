import { WaterQuality } from './../models/water-quality';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiURL = "/api/locations"

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Location[]>(this.apiURL);
  }

  get(id) {
    return this.http.get<Location>(this.apiURL + `/${id}`);
  }

  addOrUpdate(location) {
    return this.http.post(this.apiURL, location);
  }

  getWaterQualityByCityAndDate(filter){
    return this.http.post<WaterQuality[]>(this.apiURL + "/city-data", filter);
  }
}
