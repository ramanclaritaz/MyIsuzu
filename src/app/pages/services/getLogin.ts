import { Injectable,Inject } from '@angular/core';
import { httpService } from "./httpProvider";
import {  _authentication } from "./common";
import { Input } from '@angular/core/src/metadata/directives';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { retry } from 'rxjs/operator/retry';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  res:any;
  loginRes:Boolean;
 _authData:_authentication;
    constructor(@Inject(httpService) private http: httpService) {
      localStorage.clear();
  }

 public Login(userCredential) {
    let data:any
    var values = "grant_type=password&username=" + userCredential.userName + "&password=" + userCredential.password;
    return this.http.post('token',values);
 }
}