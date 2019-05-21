import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaterInfo } from '../models/water-info';

@Injectable({
  providedIn: 'root'
})
export class WaterinfoService {

  Api_Url = "/api/waterinfo"

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<WaterInfo[]>(this.Api_Url);
  }
}
