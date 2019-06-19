import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Ng5SliderModule } from 'ng5-slider';

import { LocationComponent } from './location/location.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { WaterInfoListComponent } from './water-info-list/water-info-list.component';
import { WaterInfoMapComponent } from './water-info-map/water-info-map.component';
import { WaterInfoDetailComponent } from './water-info-detail/water-info-detail.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { WaterInfoTimeViewerComponent } from './water-info-time-viewer/water-info-time-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    SelectLocationComponent,
    WaterInfoListComponent,
    WaterInfoMapComponent,
    WaterInfoDetailComponent,
    LocationListComponent,
    LocationDetailComponent,
    LocationMapComponent,
    WaterInfoTimeViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
