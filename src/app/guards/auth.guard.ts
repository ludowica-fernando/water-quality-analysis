import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  canActivate() {

    let token = this.tokenStorage.getToken();

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
