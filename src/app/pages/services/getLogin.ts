import { Injectable,Inject } from '@angular/core';
import { httpService } from "./httpProvider";

@Injectable()
export class LoginService {
  res:any;
    constructor(@Inject(httpService) private http: httpService) {
  }

 public Login(userCredential:any):any{
  var data = "grant_type=password&username=" + userCredential.userName + "&password=" + userCredential.password;
  this.http.post('token',data).then(result=>this.res=result);
  return this.res==undefined?false:true;
 
 }

}