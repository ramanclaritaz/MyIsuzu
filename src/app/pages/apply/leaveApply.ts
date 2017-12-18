import { Component } from '@angular/core';
import { commonService, authentication } from '../services/common';
import { NavController } from 'ionic-angular/navigation/nav-controller';
@Component({
  selector: 'page-leaveApply',
  templateUrl: '../apply/leaveApply.html'
})

export class leaveApply {
  auth: authentication;
  constructor(private globalVar: commonService, private nav: NavController) {
    this.Oninit();
  }

  Oninit() {
    this.globalVar.goBack = 'dash';
    this.globalVar.pageTitle = 'Leave Apply';
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
  }

}
