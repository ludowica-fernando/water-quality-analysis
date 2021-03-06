import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MomentModule } from 'ngx-moment';

import { LocationComponent } from './location/location.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { WaterInfoListComponent } from './water-info-list/water-info-list.component';
import { WaterInfoMapComponent } from './water-info-map/water-info-map.component';
import { WaterInfoDetailComponent } from './water-info-detail/water-info-detail.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { WaterInfoTimeViewerComponent } from './water-info-time-viewer/water-info-time-viewer.component';
import { NavbarComponent } from './other/navbar/navbar.component';
import { LayoutComponent } from './other/layout/layout.component';
import { ChartColumnComponent } from './chart-column/chart-column.component';
import { ChartColumnVertical } from './chart-column-vertical/chart-column-vertical.component';
import { LayoutLoginComponent } from './other/layout-login/layout-login.component';
import { LoaderComponent } from './other/loader/loader.component';
import { LoginComponent } from './login/login.component';
import { httpLoaderInterceptorProvider } from './loader-interceptor';
import { httpAuthInterceptorProvider } from './auth-interceptor';
import { WaterQualityComponent } from './water-quality/water-quality.component';
import { WaterQualityListComponent } from './water-quality-list/water-quality-list.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LocationComponent,
    SelectLocationComponent,
    WaterInfoListComponent,
    WaterInfoMapComponent,
    WaterInfoDetailComponent,
    LocationDetailComponent,
    WaterInfoTimeViewerComponent,
    NavbarComponent,
    LayoutComponent,
    ChartColumnComponent,
    LayoutLoginComponent,
    LoginComponent,
    WaterQualityComponent,
    ChartColumnVertical,
    WaterQualityListComponent,
    ChartLineComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    NgxChartsModule,
    MomentModule,
    ToastrModule.forRoot(),
  ],
  providers: [httpAuthInterceptorProvider, httpLoaderInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
