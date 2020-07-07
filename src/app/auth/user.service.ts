import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_ROOT} from '../app.constants';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(userData: any): Observable<any> {
    userData.password_confirmation = userData.password;
    return this.http.post(`${API_ROOT}/user/signup`, userData).pipe(tap((res: any) => {
      if (res && res.token) {
        this.userData = res;
        this.setStorage('userData', this.userData);
      }
    }));
  }
  isAuthenticated(): boolean {
    return this.userData && new Date() <= new Date(this.userData.expires_at);
  }
  loginUser(userData: any): Observable<any> {
    return this.http.post(`${API_ROOT}/user/login`, userData).pipe(tap((res: any) => {
      if (res && res.token) {
        this.userData = res;
        this.setStorage('userData', this.userData);
      }
    }));
  }
  getStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  setStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  sendMessage(msgData) {
    return this.http.post(`${API_ROOT}/auth/send-email`, msgData).pipe(tap((res: any) => {
      if (res && res.success) {
        this.userData = res.data;
        this.setStorage('userData', this.userData);
      }
    }));
  }
}
