import { ChartLine } from './../models/chart-line';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaterInfo } from '../models/water-info';
import { ChartColumn } from '../models/chart-column';
import { Report } from '../models/report';

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

  getReportData(chartColumnFilter) {
    return this.http.post<Report>(this.apiURL + '/chart-column', chartColumnFilter);
  }

  getWaterQualityList(chartColumnFilter) {
    return this.http.post<WaterInfo[]>(this.apiURL + '/water-quality-list', chartColumnFilter);
  }

  getChartLine(chartColumnFilter) {
    return this.http.post<ChartLine>(this.apiURL + '/chart-line', chartColumnFilter);
  }

  calculateWaterQuality(chartColumnFilter) {
    return this.http.post(this.apiURL + '/water-quality', chartColumnFilter);
  }

  getWaterInfoByLocationAndDate(chartColumnFilter){
    return this.http.post<WaterInfo[]>(this.apiURL + '/report-data', chartColumnFilter);
  }
}
