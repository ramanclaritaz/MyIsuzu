import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { commonService, authentication, Load } from '../services/common';
import { showMessage } from '../services/showalert';
import { dashboardService } from '../services/dashboardServices';

@Component({
  selector: 'page-dashboard',
  templateUrl: '../dashboard/dashboard.html'
})


export class DashboardPage {
  dashCount: any;
  auth: authentication;
  constructor(private nav: NavController, private globalVar: commonService, private show: showMessage, private dashService: dashboardService, private loading: Load) {
    this.dashCount = {
      precompoffcountformobile: 0,
      compoffCountL1ForMobile: 0,
      timeofficeCount: 0,
      leaveCountL1ForMobile: 0
    }
    this.Oninit();
  }
  Oninit() {
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
    this.globalVar.goBack = 'login';
    this.globalVar.pageTitle = 'Dashboard';
    this.getDashboard()
  }
  getDashboard() {
    this.loading.show();
    this.dashService.getPendingCount(false).subscribe((result) => {
      this.dashCount = result;
      this.loading.dismiss();
    }, (err) => {

    })
  }

  loadPage(val, params) {
    this.nav.setRoot(val, { data: params });
  }
  logOut() {
    this.show.confirm("LogOut", "Do you want to Logout?", this);
  }
  confirm() {
    this.nav.setRoot('login');
  }

}
