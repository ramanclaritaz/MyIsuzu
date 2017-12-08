import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from '../services/getLogin'
@Component({
  selector: 'page-login',
  templateUrl: '../login/login.html'
})

export class loginPage {
  
  registerCredentials = { userName: 'IMI00087', password: 'isuzu123' };
 
  constructor(private nav: NavController,private loginService:LoginService) {
  }
  public login() {
    var result= this.loginService.Login(this.registerCredentials);
    console.log(result);
    if(result){
      this.nav.setRoot('dash');
    }
  }
}
