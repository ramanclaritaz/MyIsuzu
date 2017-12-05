import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
    BrowserModule,
    IonicModule.forRoot(MyApp,null,deepLinkConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,loginPage,
    DashboardPage,
    ApprovalList,leaveApply,compOffApply
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
 
})

export class AppModule {


  
}
