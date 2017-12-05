import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: '../login/login.html'
})

export class loginPage {
  
  // loading: Loading;
  registerCredentials = { userName: 'IMI00087', password: 'isuzu123' };
 
  constructor(private nav: NavController) {
   }
 
  public login() {
    this.nav.setRoot('dash');
  }
 

}
