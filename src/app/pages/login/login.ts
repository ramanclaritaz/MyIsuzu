import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../services/getLogin'
import { commonService } from '../services/common';
@Component({
  selector: 'page-login',
  templateUrl: '../login/login.html'
})

export class loginPage {

  registerCredentials = { userName: 'IMI00087', password: 'isuzu123' };

  constructor(private nav: NavController, private loginService: LoginService, private com: commonService) {
    localStorage.clear();
  }
  public login() {
    this.loginService.Login(this.registerCredentials).subscribe((result) => {
      console.log("login console");
      console.log(result);
      if (result) {
        this.com.auth = result;
        this.AssginData(result);
        localStorage.setItem('token', result.access_token)
        this.com.getEmployeeInfo();
        this.nav.setRoot('dash');
      }
    });
  }
  AssginData(result) {
    this.com.auth = result;
    this.com.auth.isAuth = true;
    this.com.auth.isplantuser = (result.isplantuser == "False" ? false : true);
    this.com.auth.isplantteamleader = (result.isplantteamleader == "False" ? false : true);
    this.com.auth.isdualrole = (result.isdualrole == "False" ? false : true);
    this.com.auth.istrainee = (result.istrainee == "False" ? false : true);
    this.com.auth.isplantuser = (result.isplantuser == "False" ? false : true);
  }
}

