import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {LoginService} from './pages/script/getLogin'
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';

import { deepLinkConfig } from './app.route'
import { MyApp } from "./app.component";
import { loginPage } from './pages/login/login';
import { DashboardPage } from './pages/dashboard/dashboard';
import { ApprovalList } from "./pages/approval/approvalList";
import { leaveApply } from "./pages/apply/leaveApply";
import { compOffApply } from "./pages/apply/compOffApply";

@NgModule({
  declarations: [
    MyApp,loginPage,
    DashboardPage,
    ApprovalList,leaveApply,compOffApply
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp,null,deepLinkConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    loginPage,
    DashboardPage,
    ApprovalList,
    leaveApply,
    compOffApply
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
 
})

export class AppModule {


  
}
