import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) { }

  canActivate() {

    let authority = this.tokenStorage.getAuthority();

    if (authority && authority == "ROLE_ADMIN") {
      return true;
    }

    this.toastr.error("Not Authorized!", "Error");
    this.router.navigate(['/']);
    return false;
  }
}
