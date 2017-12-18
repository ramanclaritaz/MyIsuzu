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
    this.globalVar.goBack = 'login';
    this.globalVar.pageTitle = 'Dashboard';
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
  }

  loadPage(val) {
    console.log(val);
    this.nav.setRoot(val);
  }
  logOut() {
    this.show.confirm("LogOut", "Do you want to Logout?", this);
  }
  confirm() {
    this.nav.setRoot('login');
  }

}
