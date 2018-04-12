import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../services/getLogin'
import { commonService, Load } from '../services/common';
import { showMessage } from '../services/showalert';
@Component({
  selector: 'page-login',
  templateUrl: '../login/login.html'
})

export class loginPage {
  logoPath: any;
  registerCredentials = { userName: undefined, password: undefined };
  constructor(private nav: NavController, private show: showMessage, private loginService: LoginService, private com: commonService, private loading: Load) {
    localStorage.clear();
    this.com.auth = undefined;
    this.logoPath=this.loginService.logo;
  }
  public login() {
    this.loading.show();
    this.loginService.Login(this.registerCredentials).subscribe((result) => {
      if (result) {
        this.loading.dismiss();
        this.com.auth = result;
        this.AssginData(result);
        localStorage.setItem('token', result.access_token)
        this.com.getEmployeeInfo();
        this.nav.setRoot('dash');
      }
    }, (error) => {

      this.show.alert('error', 'The user name or password is incorrect.');
      this.loading.dismiss();
    });
  }
  AssginData(result) {
    console.log(result);
    this.com.auth = result;
    this.com.auth.isAuth = true;
    this.com.auth.isplantteamleader = (result.isplantteamleader == "False" ? false : true);
    this.com.auth.isdualrole = (result.isdualrole == "False" ? false : true);
    this.com.auth.istrainee = (result.istrainee == "False" ? false : true);
    this.com.auth.isplantuser = (result.locationid == 1 ? true : false);
  }
}

