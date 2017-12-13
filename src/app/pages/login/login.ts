import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from '../services/getLogin'
import { commonService } from '../services/common';
@Component({
  selector: 'page-login',
  templateUrl: '../login/login.html'
})

export class loginPage {
  
  registerCredentials = { userName: 'IMI00087', password: 'isuzu123' };
 
  constructor(private nav: NavController,private loginService:LoginService,private com:commonService) {
    localStorage.clear();
  }
  public login() {
    this.loginService.Login(this.registerCredentials).subscribe((result) =>    {
      console.log("login console");
      console.log(result);
      if(result){
        this.com.auth=result;
        this.com.getEmployeeInfo();
        localStorage.setItem('token',result.access_token)
        this.nav.setRoot('dash');
      }
    });
    
  }
}

