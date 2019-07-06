import { AuthGuard } from './guards/auth.guard';
import { LocationListComponent } from './location-list/location-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageWaterInfoComponent } from './manage-water-info/manage-water-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { WaterInfoMapComponent } from './water-info-map/water-info-map.component';
import { WaterInfoListComponent } from './water-info-list/water-info-list.component';
import { WaterInfoDetailComponent } from './water-info-detail/water-info-detail.component';
import { ManageLocationComponent } from './manage-location/manage-location.component';
import { ChartColumnComponent } from './chart-column/chart-column.component';
import { LayoutComponent } from './other/layout/layout.component';
import { LayoutLoginComponent } from './other/layout-login/layout-login.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', component: DashboardComponent },

      { path: 'add-locations', component: LocationComponent },
      { path: 'view-locations', component: LocationListComponent },
      // { path: 'locations/new', component: LocationComponent },
      // { path: 'locations/:id', component: LocationComponent },

      { path: 'water-info', component: WaterInfoListComponent },
      { path: 'water-info/new', component: WaterInfoDetailComponent },
      { path: 'water-info/:id', component: WaterInfoDetailComponent },

      { path: 'manage-water-info', component: ManageWaterInfoComponent },
      { path: 'manage-water-info/new', component: ManageWaterInfoComponent },
      { path: 'manage-water-info/:id', component: ManageWaterInfoComponent },

      { path: 'locations', component: ManageLocationComponent },
      { path: 'locations/new', component: ManageLocationComponent },
      { path: 'locations/:id', component: ManageLocationComponent },

      { path: 'chart-column', component: ChartColumnComponent },
    ]
  },

  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
