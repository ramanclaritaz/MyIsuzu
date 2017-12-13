import { Injectable,Inject } from '@angular/core';
import { httpService } from "./httpProvider";
import { Input } from '@angular/core/src/metadata/directives';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { retry } from 'rxjs/operator/retry';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  
  res:any;
  loginRes:Boolean;
    constructor(@Inject(httpService) private http: httpService) {
      localStorage.clear();
  }

 public Login(userCredential):Observable<any> {
    let data:any
    var values = "grant_type=password&username=" + userCredential.userName + "&password=" + userCredential.password;
    return this.http.post('token',values);
 }
}