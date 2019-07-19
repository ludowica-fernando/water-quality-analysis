import { ChartLineComponent } from './chart-line/chart-line.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { ChartColumnVertical } from './chart-column-vertical/chart-column-vertical.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { WaterInfoListComponent } from './water-info-list/water-info-list.component';
import { WaterInfoDetailComponent } from './water-info-detail/water-info-detail.component';
import { ChartColumnComponent } from './chart-column/chart-column.component';
import { LayoutComponent } from './other/layout/layout.component';
import { LayoutLoginComponent } from './other/layout-login/layout-login.component';
import { LoginComponent } from './login/login.component';
import { WaterQualityComponent } from './water-quality/water-quality.component';
import { WaterQualityListComponent } from './water-quality-list/water-quality-list.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', component: WaterInfoListComponent },

      { path: 'add-locations', component: LocationComponent },

      { path: 'water-info', component: WaterInfoListComponent },
      { path: 'water-info/new', component: WaterInfoDetailComponent },
      { path: 'water-info/:id', component: WaterInfoDetailComponent },

      { path: 'manage-water-info', component: WaterInfoDetailComponent },
      { path: 'manage-water-info/new', component: WaterInfoDetailComponent },
      { path: 'manage-water-info/:id', component: WaterInfoDetailComponent },

      { path: 'locations', component: LocationDetailComponent },
      { path: 'locations/new', component: LocationDetailComponent },
      { path: 'locations/:id', component: LocationDetailComponent },

      { path: 'chart-column', component: ChartColumnComponent },
      { path: 'chart-line', component: ChartLineComponent },
      { path: 'chart-column-vertical', component: ChartColumnVertical },
      { path: 'water-quality', component: WaterQualityComponent },
      { path: 'water-quality-list', component: WaterQualityListComponent }
    ]
  },

  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
