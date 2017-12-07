import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginService} from '../services/getLogin'
import { environment } from '../services/app.environment'
// import { LocalStorageModule } from "angular-2-local-storage";
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
if(result)
{
this.nav.setRoot('dash');
}

  }
 

}
