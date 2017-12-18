import { Component, OnInit } from '@angular/core';
import { leaveService } from '../services/leaveServices'
import { employeeInfo, commonService, authentication } from '../services/common';
import { NavController } from 'ionic-angular/navigation/nav-controller';
// import { AvailableLeave } from '../displayModels/AvailableLeave'

@Component({
  selector: 'page-leaveApply',
  templateUrl: '../apply/leaveApply.html',
  providers: [leaveService]
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
  constructor(private leaveService: leaveService, private nav: NavController, private globalVar: commonService) {

    this.selectedTypeOfLeave = { id: '', leaveTypeName: '', sortOder: '' };
    this.selectedLeaveCode = { id: '', acronymsName: '', acronymsDescription: '', fromTime: '', toTime: '' };

    this.onLeaveTypeChange = this.OnLeaveTypeChange.bind(this);
    this.onLeaveCodeChange = this.OnLeaveCodeChange.bind(this);
    this.inTime = { month: '1990-02-19', timeStarts: '07:43', timeEnds: '1990-02-20' };
    this.outTime = { month: '1990-02-19', timeStarts: '07:43', timeEnds: '1990-02-20' };
    this.leaveCodeObj = '';
    this.OnInit();
  }

  OnInit() {
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
    this.items = {};
    let data = { params: { id: id, userId: this.auth.userid } }
    this.leaveService.getLeaveCode(data).subscribe(
      res => {
        this.leaveCode = res;
        if (this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 || this.selectedTypeOfLeave == 3) {
          this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.toMorningVisiblity = false;
          this.items.fromFulldayvisiblity = this.items.fromMorningVisiblity = true;
          this.items.fromfullorhalfday = 0;
          this.items.fromMorningDisabled = this.items.fromFulldayDisabled = true;
        }
        else if (this.selectedTypeOfLeave.id == 4) {
          this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.toMorningVisiblity = this.items.fromMorningVisiblity = false;
          this.items.fromFulldayvisiblity = true;
          this.items.fromfullorhalfday = 1;
        }
        else if (this.selectedTypeOfLeave.id == 7) {
          this.items.toMorningVisiblity = this.items.fromMorningVisiblity = false;
          this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.fromFulldayvisiblity = true;
          this.items.fromfullorhalfday = this.items.toFullorHalf = 1;
        }
        else if (this.selectedTypeOfLeave.id == 8) {
          this.items.toMorningVisiblity = this.items.fromMorningVisiblity = this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.fromFulldayvisiblity = true;
          this.items.fromfullorhalfday = this.items.toFullorHalf = this.items.fromMorningorAfternoon = this.items.toMorningorAfternoon = null;
        }
        else if (this.selectedTypeOfLeave.id == 5) {
          this.selectedLeaveCode = this.leaveCode[0];
          this.items.toFulldayVisibilty = this.items.fromFulldayvisiblity = this.items.fromMorningVisiblity = this.items.toMorningVisiblity = false;
          this.items.toDatevisiblity = true;
        }
        // if (this.selectedTypeOfLeave.id == 5) {
        //   this.selectedLeaveCode = null;
        //   this.selectedLeaveCode = this.leaveCode[0];
        // }
        // else if (this.selectedTypeOfLeave.id == 1 || this.selectedTypeOfLeave.id == 2 || this.selectedTypeOfLeave.id == 3) {
        //   this.items.toDatevisiblity = this.items.toFulldayVisibilty = this.items.toMorningVisiblity = false;
        // }
        // else if (this.selectedTypeOfLeave.id == 4) {

        //   this.items.fromfullorhalfday = 1;
        //   this.items.toFullorHalf = 1;
        //   this.items.isMornorAftervisable = false;
        //   this.items.isToMornorAftervisable = false;

        // }
        // else if (this.selectedTypeOfLeave.id == 7) {
        //   this.items.fromfullorhalfday = 1;
        //   this.items.toFullorHalf = 1;
        //   this.items.isMornorAftervisable = false;
        //   this.items.isToMornorAftervisable = false;
        //   this.items.isToFulldaydisable = true;
        //   console.log("MyTestMM"); console.log(this.items.isMornorAftervisable);

        // } else if (this.selectedTypeOfLeave.id == 6 || this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9) {

        //   console.log("mm"); console.log(this.items.isToMornorAftervisable);
        //   this.items.isFulldaydisable = false;
        //   this.items.isMornorAfterdisable = false;
        //   this.items.isMornorAftervisable = true;
        //   this.items.isToMornorAftervisable = true;
        //   this.items.fromfullorhalfday = '';
        //   this.items.toFullorHalf = '';
        //   this.items.fromMorningorAfternoon = '';
        //   this.items.toMorningorAfternoon = '';
        // }
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
        this.items.fromfullorhalfday = 1;
      }
      else if (this.selectedTypeOfLeave.id == 6 && this.selectedLeaveCode.id == 17) {
        console.log("1"); console.log(this.selectedLeaveCode);
        this.items.fromfullorhalfday = 1;
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

    if (this.selectedTypeOfLeave.id == 8 || this.selectedTypeOfLeave.id == 9) {
      if (this.items.fromfullorhalfday == 1) {
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
  }
}