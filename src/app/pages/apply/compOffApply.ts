import { Component } from '@angular/core';

import { commonService, authentication, Load } from '../services/common';
import { showMessage } from '../services/showalert';
import { compOffServices } from '../services/compOffServices';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import moment from "moment";


@Component({
  selector: 'page-compOffApply',
  templateUrl: '../apply/compOffApply.html'
})





export class compOffApply {
  formGroup: any;
  availCompOff = {
    compoffFulldaycount: 0, compoffHalfdaycount: 0
  }

  Emp_Info: any;
  comOffDay: any;
  TLList: any;
  minDate: any;
  AvailableDates: any[];
  userId: any;
  auth: authentication;
  isMornorAftervisable: boolean;
  isAvailCompOff: boolean;
  constructor(private show: showMessage, private globalVar: commonService, private comOffService: compOffServices, private nav: NavController,private loading: Load) {
    this.Oninit();
  }
  Oninit() {
    this.loading.show();
    this.globalVar.goBack = 'dash';
    this.globalVar.pageTitle = 'Comoff Apply';
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }

    this.comOffDay = { isFullDay: 0, fromDate: undefined, toDate: undefined, isMorning: undefined };

    this.Emp_Info = this.globalVar.employeeInfo;
    this.TLList = this.globalVar.getListOfTL();
    this.getCompOffCount();
    this.loading.dismiss();
  }

  getCompOffCount() {
    this.comOffService.getCompoffCount(this.auth.userid, this.auth.isplantuser).subscribe((result) => {
      this.availCompOff = result;
    })
  }
  getCompOffAvailableDates(fromDate, toDate) {
    let data = {
      params: {
        userId: this.auth.userid, fromDate: fromDate,
        toDate: toDate
      }
    };
    this.loading.show();
    this.comOffService.GetTotalDaysExceptAnyLeaves(data, this.auth.isplantuser).subscribe((result) => {
      if (result != undefined) {
        let dateDiff = result.totalDaysExceptHolidays; // (moment.duration(moment(toCompOffDate).diff(moment(fromCompOffDate))).asDays() + 1); // moment(toCompOffDate).format("DD-MM-YYYY") - moment(fromCompOffDate).format("DD-MM-YYYY")

        if (dateDiff > 1) {
          this.comOffDay.isFullDay = 1;
          this.isMornorAftervisable = false;
        }
        let data = {
          params: {
            userId: this.auth.userid,
            fromDate: fromDate,
            isFullDay: this.comOffDay.isFullDay, toDate: toDate
          }
        };
        this.comOffService.getCompOffAvailableDates(data, this.auth.isplantuser).subscribe((result) => {
          this.loading.dismiss();
          if (result != undefined) {
            this.AvailableDates = result.compofftaken;
            this.isAvailCompOff = true;
            if (result.totalCount == dateDiff)
              this.isAvailCompOff = false;
          }
        }, (err) => {
          this.loading.dismiss();
        });
      }
    }, (err) => {
      this.loading.dismiss();
    });
  }
  dateChanged() {
    if (this.comOffDay.fromDate == undefined) {
      this.show.alert("Required", "Select from date!");
      return false;
    }
    else if (this.comOffDay.toDate == undefined && this.comOffDay.isFullDay == 1) {
      this.show.alert("Required", "Select to date!");
      return false;
    }
    else if (this.comOffDay.toDate == undefined && this.comOffDay.isFullDay == 0) {
      this.comOffDay.toDate = this.comOffDay.fromDate;
    }
    if (this.comOffDay.toDate > this.comOffDay.toDate) {
      this.show.alert("Leave Apply", "From Date Should not be Greater than To Date");
      return false;
    }
    var fromDate, toDate;
    fromDate = moment(this.comOffDay.fromDate).format('MM/DD/YYYY');
    if (this.comOffDay.isFullDay == 1)
      toDate = moment(this.comOffDay.fromDate).format('MM/DD/YYYY');
    else
      toDate = moment(this.comOffDay.toDate).format('MM/DD/YYYY');
    if (this.auth.isplantuser) {
      this.getCompOffAvailableDates(fromDate, toDate);
    }
    else {


      let data;
      data = {
        params: {
          fromDate: fromDate,
          isFullDay: this.comOffDay.isFullDay, toDate: toDate
        }
      };
      this.loading.show();
      this.comOffService.getCompOffAvailableDates(data, this.auth.isplantuser).subscribe((result) => {
        this.loading.dismiss();
        this.AvailableDates = result.compofftaken;
        if (this.AvailableDates.length > 0) {
          this.isAvailCompOff = true;
        }
        else {
          this.isAvailCompOff = false;
        }
      }, (err) => {
        this.loading.dismiss();
      });
    }

  }
  getClubbedCompOff() {
    if (this.comOffDay.fromDate == undefined) {
      this.show.alert("Required", "Select from date!");
      return false;
    }
    else if (this.comOffDay.toDate == undefined && this.comOffDay.isFullDay == 1) {
      this.show.alert("Required", "Select to date!");
      return false;
    }
    else if (this.comOffDay.toDate == undefined && this.comOffDay.isFullDay == 0) {
      this.comOffDay.toDate = this.comOffDay.fromDate;
    }

    if (this.comOffDay.toDate > this.comOffDay.toDate) {
      this.show.alert("Leave Apply", "From Date Should not be Greater than To Date");
      return false;
    }
    this.show.confirm("Comoff apply", "Do you want to continue...", this);

  }
  confirm() {
    var fromDate, toDate;
    fromDate = moment(this.comOffDay.fromDate).format('MM/DD/YYYY');
    if (this.comOffDay.isFullDay == 1)
      toDate = moment(this.comOffDay.fromDate).format('MM/DD/YYYY');
    else
      toDate = moment(this.comOffDay.toDate).format('MM/DD/YYYY');
    var data = { params: { compofffromDate: fromDate, compofftoDate: toDate, userId: this.globalVar.auth.userid } }
    if (this.comOffDay.isFullDay == 1 || this.comOffDay.isFullDay == 0) {
      this.loading.show();
      this.comOffService.ClubbedComOFF(data, this.globalVar.auth.isplantuser).subscribe((result) => {
        this.loading.dismiss();
        if (result == "True") {
          this.applyCompOff();
        }
        else {
          this.show.alert("CompOff", "CompOff can't be clubbed with this date!");
        }

      }, (err) => {
        this.loading.dismiss();
      });
    }
  }
  applyCompOff() {
    var totalDaysCompOff = moment(this.comOffDay.fromDate).diff(moment(this.comOffDay.toDate).format('MM/dd/yyyy'), 'days');
    var fromDate = moment(this.comOffDay.fromDate).format('MM/dd/yyyy');
    var toDate = moment(this.comOffDay.toDate).format('MM/dd/yyyy');
    if (this.comOffDay.isFullDay == 0) {
      totalDaysCompOff = 0.5;
    }
    let applyCompOffData = {
      "AppliedFor": this.Emp_Info.userId, "IsFullDay": this.comOffDay.isFullDay, "TotalCompOFF": totalDaysCompOff,
      "FromDate": fromDate,
      "ToDate": toDate,
      "CompOffReason": this.comOffDay.comments
    };
    let applyCompOffTaken = [];
    this.AvailableDates.forEach(element => {
      var applyCompOffTakenSet = {
        "compOffDate": moment(element.compOffDate).format('MM/dd/yyyy'),
        "compOffAvailableDate": moment(element.compOffAvailableDate).format('MM/dd/yyyy'),
        "status": 0
      };
      applyCompOffTaken.push(applyCompOffTakenSet);
    });

    let data = {
      CompOff: applyCompOffData,
      CompOffTakens: applyCompOffTaken
    }
    this.loading.show();
    this.comOffService.saveCompOff(data, this.globalVar.auth.isplantuser).subscribe((result) => {
      this.loading.dismiss();
      this.show.sucess("Comoff", "sucessfully saved");
      this.nav.setRoot('dash');
    }, (err) => {
      this.loading.dismiss();
    });

  }
}
