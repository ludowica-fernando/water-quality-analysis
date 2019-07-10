import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let token = this.tokenStorage.getToken();
    if (token) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(loginForm) {

    if (loginForm.username && loginForm.password) {
      this.authService.login(loginForm)
        .subscribe(
          data => {
            this.directUser(data);
            this.toastr.success("Logged In!", "Success");
          },
          error => {
            console.log(error.error.message)
            this.toastr.error(error.error.message);
          });
    }
    else{
      this.toastr.error("Empty field(s)!", "Error");
    }



  }

  directUser(data) {
    if (data) {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUsername(data.username);
      this.tokenStorage.saveAuthorities(data.authorities);

      switch (this.tokenStorage.getAuthority()) {

        case 'ROLE_ADMIN':
          this.router.navigateByUrl('');
          break;
        case 'ROLE_MM':
          this.router.navigateByUrl('');
          break;
        case 'ROLE_MC':
          this.router.navigateByUrl('');
          break;
        default:
          this.router.navigateByUrl('/login');
          break;
      }
    }
    else {
      console.log("Error!");
    }
  }

}
