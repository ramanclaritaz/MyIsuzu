import { Component, Input } from '@angular/core';

import { headerPage } from '../services/common';
import { showMessage } from '../services/showalert';
import { NavController } from 'ionic-angular/navigation/nav-controller';


@Component({
  selector: 'page-header',
  templateUrl: '../header/header.html'
})

export class header {

  @Input('headerData') data: headerPage;

  constructor(private show: showMessage, private nav: NavController) {

  }

  go() {
    this.nav.setRoot(this.data.page, { data: this.data.params });
  }
  logOut() {
    this.show.confirm("LogOut", "Do you want to Logout?", this);

    // console.log(val);
    // if (val) {
    //     this.nav.setRoot('login');
    // }
  }
  confirm() {
    this.nav.setRoot('login');
  }
}
