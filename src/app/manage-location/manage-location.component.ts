import { LocationService } from './../services/location.service';
import { Location } from './../models/location';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.css']
})
export class ManageLocationComponent implements OnInit {

  isReadOnly = true;
  id: string;
  location: Location = new Location();

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private toastr : ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.locationService.get(this.id).subscribe((data: Location) => {
        this.location = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {
    this.locationService.addOrUpdate(this.location).subscribe(data => {
      console.log(data);
      this.isReadOnly = true;
      this.toastr.success("Location added!", "Success");
      this.router.navigateByUrl("/locations/");
    });
  }

  edit() {
    this.isReadOnly = false;
  }

}
