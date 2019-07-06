import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  API_URL = '/api/auth';

  constructor(private http: HttpClient) { }

  login(loginForm): Observable<JwtResponse> {

    return this.http.post<JwtResponse>(this.API_URL + '/login', { username: loginForm.username, password: loginForm.password });
  }

  register(registerForm): Observable<string> {

    registerForm.role = ['user'];

    return this.http.post<string>(this.API_URL + '/register', registerForm);
  }
}
