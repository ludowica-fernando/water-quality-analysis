import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  canActivate() {

    let authority = this.tokenStorage.getAuthority();

    if (authority && authority == "ROLE_ADMIN") {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
