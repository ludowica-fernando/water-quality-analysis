import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaterInfo } from '../models/water-info';
import { ChartColumn } from '../models/chart-column';

@Injectable({
  providedIn: 'root'
})
export class WaterinfoService {

  apiURL = "/api/water-info"

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<WaterInfo[]>(this.apiURL);
  }

  get(id) {
    return this.http.get<WaterInfo>(this.apiURL + `/${id}`);
  }

  addOrUpdate(waterInfo) {
    return this.http.post(this.apiURL, waterInfo);
  }

  getChartColumn(chartColumnFilter) {
    return this.http.post<ChartColumn>(this.apiURL + '/chart-column', chartColumnFilter);
  }
}
