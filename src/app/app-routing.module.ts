import { ManageWaterInfoComponent } from './manage-water-info/manage-water-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { WaterInfoMapComponent } from './water-info-map/water-info-map.component';
import { WaterInfoListComponent } from './water-info-list/water-info-list.component';
import { WaterInfoDetailComponent } from './water-info-detail/water-info-detail.component';
import { ManageLocationComponent } from './manage-location/manage-location.component';

const routes: Routes = [
  { path: 'locations', component: LocationComponent },
  { path: 'locations/new', component: LocationComponent },
  { path: 'locations/:id', component: LocationComponent },

  { path: 'water-info', component: WaterInfoListComponent },
  { path: 'water-info/new', component: WaterInfoDetailComponent },
  { path: 'water-info/:id', component: WaterInfoDetailComponent },

  { path: 'manage-water-info', component: ManageWaterInfoComponent },
  { path: 'manage-water/new', component: ManageWaterInfoComponent },
  { path: 'manage-water/:id', component: ManageWaterInfoComponent },

  { path: 'manage-location', component: ManageLocationComponent },
  { path: 'manage-location/new', component: ManageLocationComponent },
  { path: 'manage-location/:id', component: ManageLocationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
