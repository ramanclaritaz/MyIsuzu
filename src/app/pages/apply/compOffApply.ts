import { Component } from '@angular/core';

import { commonService } from '../services/common';
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
    Comp_Info_fullday: 1, Comp_Info_halfday: 1
  }

  Emp_Info: any;
  comOffDay: any;
  TLList: any;
  minDate: any;
  AvailableDates: any[];
  constructor(private show: showMessage, private globalVar: commonService, private comOffService: compOffServices, private nav: NavController) {
    let _date = new Date();;
    this.minDate = new Date(_date.getFullYear(), _date.getMonth(), 1);
    this.comOffDay = { isFullDay: false, fromDate: _date, toDate: _date };
    this.Oninit();
  }
  Oninit() {
    this.Emp_Info = this.globalVar.employeeInfo;
    this.TLList = this.globalVar.getListOfTL();
    this.getCompOffCount();
  }

  getCompOffCount() {
    this.comOffService.getCompoffCount(this.globalVar.auth.userid, this.globalVar.auth.isplantuser).subscribe((result) => {
      this.comOffDay = result;
    });
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
    this.show.confirm("Do you want to continue...", this.confirm);

  }
  confirm() {
    var fromDate; // = $filter('date')(new Date(this.comOffDay.fromDate), 'MM-dd-yyyy');
    var toDate; // = filter('date')(new Date(this.comOffDay.toDate), 'MM-dd-yyyy');
    var data = { params: { compofffromDate: fromDate, compofftoDate: toDate, userId: this.globalVar.auth.userid } }
    if (this.comOffDay.isFullDay == 1 || this.comOffDay.isFullDay == 0) {
      this.comOffService.ClubbedComOFF(data, this.globalVar.auth.isplantuser).subscribe((result) => {
        if (result == "True") {
          this.applyCompOff();
        }
        else {
          this.show.alert("CompOff", "CompOff can't be clubbed with this date!");
        }

      });
    }
  }
  applyCompOff() {
    var totalDaysCompOff = moment(this.comOffDay.fromDate).diff(moment(this.comOffDay.toDate).format('MM/dd/yyyy'),'days');
    var fromDate=moment(this.comOffDay.fromDate).format('MM/dd/yyyy');
    var toDate=moment(this.comOffDay.toDate).format('MM/dd/yyyy');
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
    this.comOffService.saveCompOff(data, this.globalVar.auth.isplantuser).subscribe((result) => {
      this.show.sucess("Comoff", "sucessfully saved");
      this.nav.setRoot('dash');
    });

  }
}
