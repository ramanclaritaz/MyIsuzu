import { Component, OnInit } from '@angular/core';
import { leaveService } from '../services/leaveServices'
import { employeeInfo, commonService, authentication, Load } from '../services/common';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { showMessage } from '../services/showalert';
import moment from "moment";
// import { AvailableLeave } from '../displayModels/AvailableLeave'

@Component({
  selector: 'page-leaveApply',
  templateUrl: '../apply/leaveApply.html'
})

export class leaveApply {
  auth: authentication;
  empInfo: employeeInfo;
  userleave = {
    sickLeave: "", casualLeave: "", privilegeLeave: "", condolenceLeave: "", maternityLeave: "", traineeLeave: "", permission: ""
  }
  leaveType: any[];
  leaveCode: any[];
  selectedTypeOfLeave: any;
  onLeaveTypeChange: void;
  selectedLeaveCode: any;
  onLeaveCodeChange: void;
  elder_dob: Date;
  items: any;
  inTime: any;
  outTime: any;
  in = "1990-03-19";
  out = "1990-02-19";
  leaveCodeObj: any;
  constructor(private leaveService: leaveService, private nav: NavController, private globalVar: commonService, private show: showMessage,private loading:Load) {
    this.onLeaveTypeChange = this.OnLeaveTypeChange.bind(this);
    this.onLeaveCodeChange = this.OnLeaveCodeChange.bind(this);
    this.OnInit();
  }

  OnInit() {
    this.loading.show();
    this.empInfo = this.globalVar.employeeInfo;
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
    this.globalVar.pageTitle = 'Leave apply';
    this.globalVar.goBack = 'dash';
    this.getAvailableLeave();
    this.getTypeOFLeave();
    this.items = {};
    this.selectedTypeOfLeave = { };
    this.selectedLeaveCode = { };
    this.loading.dismiss();

  }

  private getAvailableLeave() {
    let data = { params: { userid: this.auth.userid } }
    this.leaveService.getAvailableLeaves(data, this.auth.isplantuser).subscribe(
      res => {
        this.userleave = res;
      });
  }
  private getTypeOFLeave(): void {
    this.leaveService.getTypeOfLeave().subscribe(
      res => {
        this.leaveType = res;
      });
  }

  getLeaveCode(id: number): void {
    this.loading.show();
    this.items = {};
    let data = { params: { id: id, userId: this.auth.userid } }
    this.leaveService.getLeaveCode(data).subscribe(
      res => {
        this.loading.dismiss();
        this.leaveCode = res;
        if (this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 || this.selectedTypeOfLeave == 3) {
          this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.toMorningVisiblity = false;
          this.items.fromFulldayvisiblity = this.items.fromMorningVisiblity = true;
          this.items.fromFullorHalf = 0;
          this.items.fromMorningDisabled = this.items.fromFulldayDisabled = true;
        }
        else if (this.selectedTypeOfLeave.id == 4) {
          this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.toMorningVisiblity = this.items.fromMorningVisiblity = false;
          this.items.fromFulldayvisiblity = true;
          this.items.fromFullorHalf = 1;
        }
        else if (this.selectedTypeOfLeave.id == 7) {
          this.items.toMorningVisiblity = this.items.fromMorningVisiblity = false;
          this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.fromFulldayvisiblity = true;
          this.items.fromFullorHalf = this.items.toFullorHalf = 1;
        }
        else if (this.selectedTypeOfLeave.id == 8) {
          this.items.toMorningVisiblity = this.items.fromMorningVisiblity = this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.fromFulldayvisiblity = true;
          this.items.fromFullorHalf = this.items.toFullorHalf = this.items.fromMorningorAfternoon = this.items.toMorningorAfternoon = null;
        }
        else if (this.selectedTypeOfLeave.id == 5) {
          this.selectedLeaveCode = this.leaveCode[0];
          this.items.toFulldayVisibilty = this.items.fromFulldayvisiblity = this.items.fromMorningVisiblity = this.items.toMorningVisiblity = false;
          this.items.toDatevisiblity = true;
        }
      },(err) => {
        this.loading.dismiss();
      });
  }

  OnLeaveTypeChange() {
    if (this.selectedTypeOfLeave != undefined && this.selectedTypeOfLeave != null) {
      this.getLeaveCode(this.selectedTypeOfLeave.id);
    }
  }

  OnLeaveCodeChange() {
    if (this.selectedLeaveCode != undefined && this.selectedLeaveCode != null) {
      let halfday = { afternoon: [6, 8, 27, 33, 35, 37, 23], morning: [5, 26, 31, 32, 34, 36, 22] };
      let isMorning = halfday.morning.filter((val) => {
        if (this.selectedLeaveCode.id == val) {
          return true;
        }
      });
      let isAfternoon = halfday.afternoon.filter((val) => {
        if (this.selectedLeaveCode.id == val)
          return true;
      });
      if (isMorning.length > 0 || isAfternoon.length > 0) {
        if (isMorning.length > 0)
          this.items.fromMorningorAfternoon = 1;
        else {
          this.items.fromMorningorAfternoon = 0;
        }
      }
      else if (this.selectedLeaveCode.id == 24) {
        this.items.fromMorningVisiblity = false;
        this.items.fromFullorHalf = 1;
      }
      else if (this.selectedTypeOfLeave.id == 6 && this.selectedLeaveCode.id == 17) {
        console.log("1"); console.log(this.selectedLeaveCode);
        this.items.fromFullorHalf = 1;
        this.items.toFullorHalf = 1;
        this.items.isMornorAftervisable = false;
        this.items.isToMornorAftervisable = false;
        this.items.isFulldaydisable = true;
        this.items.isToFulldaydisable = true;
      } else if (this.selectedTypeOfLeave.id == 6) {
        this.selectedTypeOfLeave.isFulldaydisable = false;
        this.selectedTypeOfLeave.isToFulldaydisable = false;
      }
    }
  }
  changed() {

    if (this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9 || this.selectedTypeOfLeave.id == 6) {
      if (this.items.fromFullorHalf == 1) {
        this.items.toFullorHalf = 0;
        this.items.toMorningorAfternoon = 1;
        this.items.fromMorningorAfternoon = undefined;
        this.items.fromMorningVisiblity = false;
        this.items.toFulldayDisabled = this.items.toMorningDisabled = this.items.toMorningVisiblity = true;
      }
      else {
        {
          this.items.toFullorHalf = 1;
          this.items.toMorningorAfternoon = undefined;
          this.items.toMorningVisiblity = false;
          this.items.fromMorningorAfternoon = 0;
          this.items.toFulldayDisabled = this.items.toMorningDisabled = this.items.fromMorningVisiblity = true;
        }
      }
    }
    this.fromDateChanged();
  }
  getLeaveTypesAcronyms() {
    if (this.selectedTypeOfLeave.id == 6 && this.selectedLeaveCode.id == 17) {
      this.items.fromFullorHalf = 1;
      this.items.toFullorHalf = 1;
      this.items.toMorningVisiblity = this.items.fromMorningVisiblity = false;
      this.items.toFulldayDisabled = this.items.fromFulldayDisabled = true;
    } else if (this.selectedTypeOfLeave.id == 6) {
      this.items.toFulldayDisabled = this.items.fromFulldayDisabled = false;
    }
    if (this.selectedLeaveCode.id == 17) {
      this.items.fromDate = this.items.toDate = undefined;
    }
    if (this.selectedTypeOfLeave.id == 6) {
      if (this.selectedLeaveCode.id == 17) {
        var d = new Date();
        var e = new Date();
        e.setDate(d.getDate() + 180);
        var diff_date = moment(d).diff(e);
        var years = Math.floor(diff_date / 31536000000);
        var months = Math.floor((diff_date % 31536000000) / 2628000000);
        this.items.toDate = moment(e).format("YYYY-MM-DD");
        this.items.fromDate = moment(d).format("YYYY-MM-DD");
      }
    }
    if (this.selectedLeaveCode.id == 6 || this.selectedLeaveCode.id == 8 ||
      this.selectedLeaveCode.id == 27 || this.selectedLeaveCode.id == 33
      || this.selectedLeaveCode.id == 35
      || this.selectedLeaveCode.id == 37) {
      this.items.fromMorningorAfternoon = 1; this.items.TotalDays = 0.5;
    } else if (this.selectedLeaveCode.id == 5 || this.selectedLeaveCode.id == 26 ||
      this.selectedLeaveCode.id == 31 ||
      this.selectedLeaveCode.id == 34 || this.selectedLeaveCode.id == 32
      || this.selectedLeaveCode.id == 36) {
      this.items.fromMorningorAfternoon = 0; this.items.TotalDays = 0.5;
    } else if (this.selectedLeaveCode.id == 12) {
      this.items.fromMorningorAfternoon = 0; this.items.TotalDays = 0.5;
    } else if (this.selectedLeaveCode.id == 13) {
      this.items.fromMorningorAfternoon = 1; this.items.TotalDays = 0.5;
    }
    else if (this.selectedLeaveCode.id == 22) {
      this.items.fromMorningorAfternoon = 0; this.items.TotalDays = 0.5;
      this.items.fromMorningVisiblity = true;
      this.items.fromFullorHalf = 0;
    } else if (this.selectedLeaveCode.id == 23) {
      this.items.fromMorningorAfternoon = 1; this.items.TotalDays = 0.5;
      this.items.fromMorningVisiblity = true;
      this.items.fromFullorHalf = 0;
    }
    else if (this.selectedLeaveCode.id == 24) {
      this.items.fromMorningVisiblity = false;
      this.items.fromFullorHalf = 1; this.items.TotalDays = 0.5;
    }
    if ((this.selectedTypeOfLeave.id == 5 || this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 7 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9)) {
      this.items.TotalDays = undefined;
    }
  }
  getProb() {
    if (this.selectedTypeOfLeave.id == undefined || this.selectedTypeOfLeave.id == "") {
      this.show.alert('Required', 'Please Select type of leave');
      return false;
    }
    else if (this.selectedLeaveCode.id == undefined || this.selectedLeaveCode.id == "") {
      this.show.alert('Required', 'Please select attedance code');
      return false;
    }
    else if (this.items.fromDate == undefined) {
      this.show.alert('Required', 'Please select the date');
      return false;
    }
    else if ((this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 || (this.selectedTypeOfLeave.id == 3 && (this.selectedLeaveCode.id.id == 22 || this.selectedLeaveCode.id.id == 23))) && this.items.fromFullorHalf == undefined) {
      this.show.alert('Required', 'Please Select from full day or half day');
      return false;
    }
    else if ((this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 || (this.selectedTypeOfLeave.id == 3 && (this.selectedLeaveCode.id.id == 22 || this.selectedLeaveCode.id.id == 23))) && this.items.fromMorningorAfternoon == undefined) {
      this.show.alert('Required', 'Please Select from morning or afternoon');
      return false;
    }
    else if ((this.selectedTypeOfLeave.id == 5 || this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 7 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9) && this.items.toDate == undefined) {
      this.show.alert('Required', 'Please select the to date');
      return false;
    }
    else if (this.items.comments == undefined) {
      this.show.alert('Required', 'Reason is required');
      return false;
    }
    else if ((this.selectedTypeOfLeave.id == 5 || this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 7 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9) && this.items.toDate == undefined) {
      this.show.alert('Required', 'to date is required');
      return false;
    }
    else if (this.auth.istrainee == true) {
      if (this.selectedLeaveCode.id != 25 && this.selectedLeaveCode.id != 26 &&
        this.selectedLeaveCode.id != 27 && this.selectedLeaveCode.id != 22
        && this.selectedLeaveCode.id.id != 23 && this.selectedLeaveCode.id.id != 24
        && this.selectedLeaveCode.id.id != 12 && this.selectedLeaveCode.id.id != 13) {
        this.show.alert("Leave Apply", "You can't take this leave, Please take trainee leave");
        return false;
      }
    }
    else if (this.auth.istrainee) {
      if (this.selectedLeaveCode.id.id == 25 || this.selectedLeaveCode.id.id == 26 || this.selectedLeaveCode.id.id == 27) {
        this.show.alert("Leave Apply", "You can't take Trainee leave, Please take Other leave");
        return false;
      }
    }
    var fromDate, toDate;
    fromDate = moment(this.items.fromDate).format('MM/DD/YYYY')
    if (this.items.toDate == undefined) {
      toDate = moment(this.items.fromDate).format('MM/DD/YYYY')
    }
    else {
      toDate = moment(this.items.toDate).format('MM/DD/YYYY')
    }
    if ((this.selectedTypeOfLeave.id == 5 || this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 7 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9) && this.items.toDate != undefined) {
      if (fromDate > toDate) {
        this.show.alert("Leave Apply", "From Date Should not be Greater than To Date");
        return false;
      }
    }
    if ((this.selectedTypeOfLeave.id == 5 || this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 7 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9))
      toDate = moment(this.items.fromDate).format('MM/DD/YYYY')
    else
      toDate = moment(this.items.toDate).format('MM/DD/YYYY')
    if (((this.selectedTypeOfLeave.id == 6 && this.items.TotalDays > 3 && this.items.attachments) || (this.selectedTypeOfLeave.id == 7 && this.items.TotalDays == 2) ||
      (this.selectedTypeOfLeave.id != 7 && this.selectedTypeOfLeave.id != 6 && this.selectedTypeOfLeave.id != 8 &&
        this.selectedTypeOfLeave.id != 9 && this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 && this.items.TotalDays == 1) ||
      (this.selectedTypeOfLeave.id == 5) ||
      (this.selectedTypeOfLeave.id == 4 && this.items.TotalDays == 1) ||
      (this.selectedTypeOfLeave.id == 9 && this.items.TotalDays == 2.5) ||
      (this.selectedTypeOfLeave.id == 8 && this.items.TotalDays == 1.5) ||
      (this.selectedLeaveCode.id.id == 24 && this.items.TotalDays == 1) ||
      (this.selectedLeaveCode.id.id == 17 && this.items.TotalDays >= 80) ||
      ((this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 || this.selectedTypeOfLeave.id == 3)) ||
      (this.selectedTypeOfLeave.id == 6 && this.items.TotalDays >= 3) ||
      (this.selectedLeaveCode.id.id == 29 && this.selectedTypeOfLeave.id == 9 && this.items.TotalDays == 2.5) ||
      (this.selectedLeaveCode.id.id == 9 && this.selectedTypeOfLeave.id == 6 && this.items.TotalDays >= 3) ||
      (this.selectedLeaveCode.id.id == 16 && this.selectedTypeOfLeave.id == 6 && this.items.TotalDays >= 3) ||
      (this.selectedLeaveCode.id.id == 29 && this.selectedTypeOfLeave.id == 6 && this.items.TotalDays >= 3) ||
      (this.selectedLeaveCode.id.id == 9 && this.selectedTypeOfLeave.id == 6 && this.items.TotalDays >= 3) ||
      (this.selectedLeaveCode.id.id == 29 && this.selectedTypeOfLeave.id == 7 && this.items.TotalDays == 2) ||
      (this.selectedLeaveCode.id.id == 9 && this.selectedTypeOfLeave.id == 7 && this.items.TotalDays == 2) ||
      (this.selectedLeaveCode.id.id == 16 && this.selectedTypeOfLeave.id == 7 && this.items.TotalDays == 2) ||
      (this.selectedLeaveCode.id.id == 29 && this.selectedTypeOfLeave.id == 8 && this.items.TotalDays == 1.5) ||
      (this.selectedLeaveCode.id.id == 29 && this.selectedTypeOfLeave.id == 9 && this.items.TotalDays == 2.5) ||
      //(this.selectedLeaveCode.id.id == 8 && this.selectedTypeOfLeave.id == 16 && this.items.TotalDays== 2) ||
      (this.selectedLeaveCode.id.id == 9 && this.selectedTypeOfLeave.id == 8 && this.items.TotalDays == 1.5) ||
      (this.selectedLeaveCode.id.id == 16 && this.selectedTypeOfLeave.id == 8 && this.items.TotalDays == 1.5) ||
      (this.selectedLeaveCode.id.id == 9 && this.selectedTypeOfLeave.id == 9 && this.items.TotalDays == 2.5) ||
      (this.selectedLeaveCode.id.id == 16 && this.selectedTypeOfLeave.id == 9 && this.items.TotalDays == 2.5)
    )) {
      //this.show.alert("Leave Apply","Please check days!");
    }
    else {
      this.show.alert("Leave Apply", "Please select valid date ");
      return false;
    }
    var data = {
      params:
        { typeId: this.selectedTypeOfLeave.id, typeCodeId: this.selectedLeaveCode.id }
    }
    this.loading.show();
    this.leaveService.GetProbabilityOfLeave(data, this.auth.isplantuser).subscribe((result) => {
      this.loading.dismiss();
      if (result != 0) {
        this.applyLeave(result);
      }
      else {
        this.show.alert("Leave Apply", "Leave Not Available!");
      }
    },(err) => {
      this.loading.dismiss();
    });
  }
  applyLeave(ProbabilityOfLeave) {
    var fromDate, toDate, fromTime, toTime;
    let currentDate = moment(new Date()).format("MM/DD/YYYY");
    fromDate = moment(this.items.fromDate).format('MM/DD/YYYY');
    if ((this.selectedTypeOfLeave.id == 5 || this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 7 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9) && this.items.toDate != undefined)
      toDate = moment(this.items.fromDate).format('MM/DD/YYYY');
    else if (this.items.toDate != undefined)
      toDate = moment(this.items.toDate).format('MM/DD/YYYY');
    else
      toDate = moment(this.items.fromDate).format('MM/DD/YYYY');
    fromTime = moment(new Date(this.items.inTime), 'HH:mm a');
    toTime = moment(new Date(this.items.outTime), 'HH:mm a');
    if (fromDate && this.selectedTypeOfLeave.id == 5) {
      fromDate = fromDate + " " + fromTime;
    }
    if (toDate && this.selectedTypeOfLeave.id == 5) {
      toDate = toDate + " " + toTime;
    }
    let applyLeaveData = {
      "ProbabilityOfLeave": ProbabilityOfLeave,
      "AppliedFor": this.auth.userid,
      "FromDate": fromDate,
      "ToDate": toDate,
      "LocationForOnDudty": this.items.ondutylocation,
      "AppliedReason": this.items.comments,
      "CompanyId": 1,
      "totaldays": this.items.TotalDays,
      "fromFullorHalf": this.items.fromFullorHalf,
      "fromMorningorAfternoon": this.items.fromMorningorAfternoon,
      "toFullorHalf": this.items.toFullorHalf,
      "toMorningorAfternoon": this.items.toMorningorAfternoon,
      "ApprovedStatus": 0,
      "CreatedBy": this.auth.userid
    };
    this.loading.show();
    this.leaveService.SaveAppliedLeave(applyLeaveData, this.auth.isplantuser).subscribe((response) => {
      this.loading.dismiss();
      this.show.alert("Leave Apply", response.message);
      this.nav.setRoot("dash");
    },(err) => {
      this.loading.dismiss();
    });
  };
  fromDateChanged() {
    var fromDate, toDate;
    if (this.items.fromDate == undefined)
      return false;
    if (this.items.toDate == undefined)
      toDate = moment(new Date(this.items.fromDate)).format("MM/DD/YYYY");
    else
      toDate = moment(new Date(this.items.toDate)).format("MM/DD/YYYY");
    fromDate = moment(new Date(this.items.fromDate)).format("MM/DD/YYYY");
    if (this.items.toDate != undefined && moment(this.items.fromDate).format('MM/DD/YYYY') > moment(this.items.toDate).format('MM/DD/YYYY')) {
      this.show.alert("Validation", "to date should be greater than from date");
      return false;
    }
    let data = { params: { userId: this.auth.userid, fromDate: fromDate, toDate: toDate } };
    this.loading.show();
    this.leaveService.GetTotalDaysExceptAnyLeaves(data, this.auth.isplantuser).subscribe((response) => {
      this.loading.dismiss();
      this.items.isanyholiday = response.isAnyHoliday;
      this.items.totalHolidays = response.totalHolidays;
      this.items.TotalDays = response.totalDaysExceptHolidays;
      if (this.items.fromFullorHalf == 0) {
        this.items.TotalDays = this.items.TotalDays - 0.5;
      }
      if (this.items.toFullorHalf == 0) {
        this.items.TotalDays = this.items.TotalDays - 0.5;
      }
      if (this.selectedTypeOfLeave.id == 5) {
        this.items.TotalDays = response.totalDays;
      }
      if (this.selectedLeaveCode.id == 17) {
        this.items.TotalDays = response.totalDays;
      }
    },(err) => {
      this.loading.dismiss();
    })
  };
}