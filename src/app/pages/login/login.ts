import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from '../script/getLogin'

@Component({
  selector: 'page-login',
  templateUrl: '../login/login.html'
})

export class loginPage {
  
  // loading: Loading;
  registerCredentials = { userName: 'IMI00087', password: 'isuzu123' };
 
  constructor(private nav: NavController,private loginService:LoginService) {
   }
 
  public login() {
   let _Log= this.loginService.getUser(this.registerCredentials.userName,this.registerCredentials.password)
    this.nav.setRoot('dash');
  }
 

}
