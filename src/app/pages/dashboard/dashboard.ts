import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: '../dashboard/dashboard.html'
})


export class DashboardPage {
  // @ViewChild(ChildComponent) child;
  constructor(private nav: NavController) {
  }
  loadPage(val) { 
    console.log(val) ;
    this.nav.setRoot(val);
  }
 

}
