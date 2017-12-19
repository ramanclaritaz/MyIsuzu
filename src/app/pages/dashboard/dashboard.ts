import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { commonService, authentication } from '../services/common';
import { showMessage } from '../services/showalert';

@Component({
  selector: 'page-dashboard',
  templateUrl: '../dashboard/dashboard.html'
})


export class DashboardPage {
  auth: authentication;
  constructor(private nav: NavController, private globalVar: commonService, private show: showMessage) {

    this.Oninit();
  }
  Oninit() {
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
    this.globalVar.goBack = 'login';
    this.globalVar.pageTitle = 'Dashboard';
  }
   loadPage(val,params) {
    this.nav.setRoot(val,{ data: params });
  }
  logOut() {
    this.show.confirm("LogOut", "Do you want to Logout?", this);
  }
  confirm() {
    this.nav.setRoot('login');
  }

}
