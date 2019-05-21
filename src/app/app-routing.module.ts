import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { WaterInfoMapComponent } from './water-info-map/water-info-map.component';
import { WaterInfoListComponent } from './water-info-list/water-info-list.component';
import { WaterInfoDetailComponent } from './water-info-detail/water-info-detail.component';

const routes: Routes = [
  { path: 'locations', component: LocationComponent },
  { path: 'locations/new', component: LocationComponent },
  { path: 'locations/:id', component: LocationComponent },

  { path: 'water-info', component: WaterInfoListComponent },
  { path: 'water-info/new', component: WaterInfoDetailComponent },
  { path: 'water-info/:id', component: WaterInfoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
