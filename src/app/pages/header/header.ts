import { Component } from '@angular/core';

import { commonService } from '../services/common';
import { showMessage } from '../services/showalert';
import { NavController } from 'ionic-angular/navigation/nav-controller';


@Component({
    selector: 'page-header',
    templateUrl: '../header/header.html'
})

export class header {

    pageTitle: any;

    constructor(private show: showMessage, private nav: NavController, private com: commonService) {
        this.pageTitle = this.com.pageTitle;
    }

    go() {
        this.nav.setRoot(this.com.goBack);
    }
    logOut() {
        this.show.confirm("LogOut","Do you want to Logout?",this);
        
        // console.log(val);
        // if (val) {
        //     this.nav.setRoot('login');
        // }
    }
    confirm() {
        this.nav.setRoot('login');
    }
}