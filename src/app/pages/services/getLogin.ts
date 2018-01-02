import { Injectable, Inject } from '@angular/core';
import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  res: any;
  loginRes: Boolean;
  constructor( @Inject(httpService) private http: httpService) {
  }

  public Login(userCredential): Observable<any> {
    var values = "grant_type=password&username=" + userCredential.userName + "&password=" + userCredential.password;
    return this.http.post('token', values);
  }
}