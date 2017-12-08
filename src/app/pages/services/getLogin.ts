import { Injectable,Inject } from '@angular/core';
import { httpService } from "./httpProvider";
import {  _authentication } from "./common";
import { Input } from '@angular/core/src/metadata/directives';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { retry } from 'rxjs/operator/retry';

@Injectable()
export class LoginService {
  res:any;
 _authData:_authentication;
    constructor(@Inject(httpService) private http: httpService) {
      localStorage.clear();
  }

 public Login(userCredential:any):boolean{
    let data:any
    var values = "grant_type=password&username=" + userCredential.userName + "&password=" + userCredential.password;
    this.http.post('token',values).then(result=>this.res=result);
    data=this.res;
    if(data!=undefined){
        this._authData={
          token: data.access_token,
          isAuth: data.userstate,
          userName: data.username,
          role: data.role,
          userid: data.userid,
          userstate:data.userstate,
          companyid: data.companyid,
          userdepartcode: data.userdepartcode,
          designationrole: data.designationrole,
          displayname: data.displayname,
          employeenumbertype: data.employeenumbertype,
          locationid: data.locationid,
          isplantuser: data.isplantuser,
          isplantteamleader: data.isplantteamleader,
          isdualrole: data.isdualrole,
          istrainee:data.istrainee
        };
        localStorage.setItem('token',data.access_token);
        return true;
    }
  else{
      return false;
    }
  }
}