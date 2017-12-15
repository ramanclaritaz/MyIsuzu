/**
 * Libery import
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from "angular-2-local-storage";
import { Geolocation } from '@ionic-native/geolocation';

/**
 * services import
 */
import { approvalService } from "./pages/services/approvalServices";
import { LoginService } from './pages/services/getLogin'
import { compOffServices } from './pages/services/compOffServices';
import { timeEntryService } from "./pages/services/timeEntryServices";
/**
 * common classes import
 */
import { commonService } from './pages/services/common';
import { showMessage } from './pages/services/showalert';
import { httpService } from './pages/services/httpProvider'
import { deepLinkConfig } from './app.route'
/**
 * component classes import
 */
import { MyApp } from "./app.component";
import { loginPage } from './pages/login/login';
import { DashboardPage } from './pages/dashboard/dashboard';
import { ApprovalList } from "./pages/approval/approvalList";
import { leaveApply } from "./pages/apply/leaveApply";
import { compOffApply } from "./pages/apply/compOffApply";
import { ApprovalPage } from './pages/approval/approvalPage';
import { timeEntry } from './pages/timeentry/timeentry';

@NgModule({
  declarations: [
    MyApp, loginPage,
    DashboardPage,
    ApprovalList,
    leaveApply,
    compOffApply,
    ApprovalPage,
    timeEntry
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, null, deepLinkConfig),
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
    compOffApply,
    ApprovalPage,
    timeEntry
  ],
  providers: [
    StatusBar,
    commonService,
    SplashScreen,
    LoginService,
    httpService,
    approvalService,
    compOffServices,
    showMessage,
    timeEntryService,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]

})

export class AppModule {


}
