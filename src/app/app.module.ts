import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from "angular-2-local-storage";


import {LoginService} from './pages/services/getLogin'
import {httpService} from './pages/services/httpProvider'
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
    IonicModule.forRoot(MyApp,null,deepLinkConfig),
    LocalStorageModule.withConfig({
      prefix: 'iManage',
      storageType: 'localStorage'
  })
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
    LoginService,httpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  // { provide: Http,
  //   useFactory: httpFactory,
  //   deps: [XHRBackend, RequestOptions]}
  ]
 
})

export class AppModule {


  
}
