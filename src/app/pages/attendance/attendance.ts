import { Component } from '@angular/core';

import { commonService, authentication } from '../services/common';
import { showMessage } from '../services/showalert';
import { compOffServices } from '../services/compOffServices';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import moment from "moment";
import { attendanceService } from '../services/attendanceServices';


@Component({
    selector: 'page-attendance',
    templateUrl: '../attendance/attendance.html'
})

export class attendance {
    StartDate: any;
    TimeSheetList: any[];
    IsWeekSelected: boolean;
    displayYears: any[];
    WeekCount: any[];
    selectedMonth: any;
    MonthName: any;
    SelectedWeekIndex: any;
    SelectedWeekName: any;
    SearchDate: any;
    attendancelist: any[];
    selectedYearValue: any;
    dateOptions = {
        startingDay: 1,
        showWeeks: false
    };
    daysName: any[];
    DayStyle = {};
    maxdate = new Date();
    allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    working: any;
    worked: any;
    LOP: any;
    monthYearDisplay: any;
    auth: authentication;
    DayAndDate: any[];
    SundayDate = [];
    MondayDate = [];
    TuesDayDate = [];
    WednesDayDate = [];
    ThursDayDate = [];
    FirDayDate = [];
    SaturDayDate = [];
    constructor(private show: showMessage, private nav: NavController, private globalVar: commonService, private attendanceService: attendanceService) {
      this.Oninit();
    }
    Oninit()
    {
        this.globalVar.goBack='dash';
        this.globalVar.pageTitle='Comoff Apply';
        this.auth = this.globalVar.auth;
        if (this.auth == undefined || this.auth == null) {
          this.nav.setRoot('login');
        }
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        this.IsWeekSelected = false;
        this.daysName = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
        this.IsWeekSelected = false;
        this.auth = this.globalVar.auth;
        this.loadDayandYear();
        this.loadCurrentDate();
    }
    loadDayandYear() {
        let displayYears = [];
        for (let i = 0; i <= 3; i++) {
            displayYears.push(moment().subtract(i, 'year').year());
        }
        for (let i = 1; i <= 3; i++) {
            displayYears.push(moment().add('year', i).year());
        }
        displayYears.sort();
        this.displayYears = displayYears;
    }
    IsAbsOrPres(value) {
        var style1 = { color: "#F41212" };
        var style2 = { color: "#178908" };
        if (value == "AA") {
            return style1;
        }
        else {
            return style2;
        }
    }
    tileOfAbsent(value) {
        var style1 = "Absent";
        var style2 = "Present";
        if (value == "AA") {
            return style1;
        }
        else {
            return style2;
        }
    }
    lateStyle(value) {
        var style1 = { color: "#FC8D79" };
        var style2 = { color: "black" };
        if (value == "00:00:00") {
            return style2;
        }
        else {
            return style1;
        }
    }
    earlyStyle(value) {
        var style1 = { color: "#14C835" };
        var style2 = { color: "black" };
        if (value == "00:00:00") {
            return style2;
        }
        else {
            return style1;
        }
    }
    prevYear() {
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        this.IsWeekSelected = false;
        this.WeekCount = [];
        this.selectedMonth = undefined;
        this.MonthName = undefined;
        this.SelectedWeekIndex = undefined;
        this.SelectedWeekName = undefined;
        this.SearchDate = null;
        this.attendancelist = [];
        if (this.selectedYearValue) {
            this.selectedYearValue = this.selectedYearValue - 1;
        }
        var prevYearValue = this.displayYears[0] - 1;
        this.displayYears.unshift(prevYearValue);
        this.displayYears.pop();
    }

    currentYear() {
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        let displayYears = [];
        for (let i = 0; i <= 3; i++) {
            displayYears.push(moment().subtract(i, 'year').year());
        }
        for (let i = 1; i <= 3; i++) {
            displayYears.push(moment().add('year', i).year());
        }
        displayYears.sort();
        this.displayYears = displayYears;
        this.loadCurrentDate();
    }
    nextYear() {
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        this.IsWeekSelected = false;
        this.WeekCount = [];
        this.selectedMonth = undefined;
        this.MonthName = undefined;
        this.SelectedWeekIndex = undefined;
        this.SelectedWeekName = undefined;
        this.SearchDate = null;
        this.TimeSheetList = [];
        this.attendancelist = [];
        if (this.selectedYearValue) {
            this.selectedYearValue = this.selectedYearValue + 1;
        }
        var nextYearValue = this.displayYears[this.displayYears.length - 1] + 1;
        this.displayYears.push(nextYearValue);
        this.displayYears.shift();
    }
    getDaysFromWeek(indexValue, weekName, isweekclickkevent) {
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        if (this.selectedYearValue == 0) {
            this.show.error("Error", "please select year");
            return false;
        }
        this.SearchDate = null;
        this.DayStyle = {};
        this.SelectedWeekIndex = indexValue;

        this.SelectedWeekName = weekName;
        this.IsWeekSelected = true;
    }
    selectedYear(value, context) {
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        this.IsWeekSelected = false;
        this.WeekCount = [];
        this.selectedYearValue = value;
        this.selectedMonth = undefined;
        this.MonthName = undefined;
        this.SelectedWeekIndex = undefined;
        this.SelectedWeekName = undefined;
        this.SearchDate = null;
        this.TimeSheetList = [];
    }
    getDaysArray(month, MonthName, isclickkevent) {
        this.StartDate = moment(new Date()).format("DD-MM-YYYY");
        if (this.selectedYearValue == 0) {
            this.show.error('error', "please select year");
            return false;
        }

        this.SearchDate = null;
        let searchDate = "";
        let WeekToDate = "";
        this.SelectedWeekIndex = undefined;
        this.SelectedWeekName = undefined;
        this.MonthName = MonthName;
        this.selectedMonth = "";
        this.IsWeekSelected = false;
        this.selectedMonth = month;
        month = month + 1;
        var date = new Date(this.selectedYearValue, month - 1, 1);
        var dayofweek = date.getDay();

        this.DayAndDate = [];
        while (date.getMonth() == month - 1) {
            this.DayAndDate.push({ "Date": date.getDate(), "Day": this.daysName[date.getDay()] });
            date.setDate(date.getDate() + 1);
        }
        searchDate = moment(new Date(this.selectedYearValue, month - 1, this.DayAndDate[0].Date)).format('MM/DD/YYYY');
        WeekToDate = moment(new Date(this.selectedYearValue, month - 1, this.DayAndDate[this.DayAndDate.length - 1].Date)).format('MM/DD/YYYY');

        //var wkCount = Math.ceil(this.DayAndDate.length / 7);

        let wkCount = Math.ceil((this.DayAndDate.length + dayofweek) / 7);
        let wkCountArray = [];
        for (var i = 0; i < wkCount; i++) {
            wkCountArray.push({});
        }

        this.WeekCount = [];
        let searchstartdate = moment(new Date(searchDate)).format("MM-DD-YYYY");
        let searchenddate = moment(new Date(WeekToDate)).format("MM-DD-YYYY");
        this.loadAttendance(searchDate, WeekToDate, this.auth.userid);
    }
    // watch("SearchDate", function (newValue, oldValue) {
    //     if (this.SearchDate != undefined && this.SearchDate != "") {
    //         this.StartDate = moment(this.SearchDate).format("DD-MM-YYYY");
    //     }
    // });


    loadAttendance(searchDate, WeekToDate, uid) {
        let data = {
            params: {
                dateValue: searchDate, WeekToDate: WeekToDate,
                userId: uid
            }
        };
        this.attendanceService.getAttendance(data, this.auth.isplantuser).subscribe((result) => {
            let res = result;
            this.working = res.workingDays;
            this.worked = res.workedDays;
            this.LOP = res.lossofPay;
            this.monthYearDisplay = res.monthYearDisplay;

            for (var i = 0; i < this.DayAndDate.length; i++) {
                var currentDay = res.attendanceModel.filter(val => {
                    if (res.attendanceModel.attendanceDay == this.DayAndDate[i].Day) {
                        return res.attendanceModel;
                    }
                });
                var code = currentDay.length > 0 ? currentDay[0].attendanceCode : null;
                var codecolor = code != null && (code == "AA" || code == "XA" || code == "AX") ? '#FF0000' : '#92D050';
                if (this.DayAndDate[i].Day == "SUN") {
                    this.SundayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": '#C5D9F1' });
                }
                if (this.DayAndDate[i].Day == "MON") {
                    this.MondayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": codecolor });
                    if (i == 0) {
                        this.SundayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                    }
                }
                if (this.DayAndDate[i].Day == "TUE") {
                    this.TuesDayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": codecolor });
                    if (i == 0) {
                        this.SundayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.MondayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                    }
                }
                if (this.DayAndDate[i].Day == "WED") {
                    this.WednesDayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": codecolor });
                    if (i == 0) {
                        this.SundayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.MondayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.TuesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                    }
                }
                if (this.DayAndDate[i].Day == "THR") {
                    this.ThursDayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": codecolor });
                    if (i == 0) {
                        this.SundayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.MondayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.TuesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.WednesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                    }
                }
                if (this.DayAndDate[i].Day == "FRI") {
                    this.FirDayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": codecolor });
                    if (i == 0) {
                        this.SundayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.MondayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.TuesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.WednesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.ThursDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                    }
                }
                if (this.DayAndDate[i].Day == "SAT") {
                    this.SaturDayDate.push({ "Date": this.DayAndDate[i].Date, "Code": code, "ColorCode": '#C5D9F1' });
                    if (i == 0) {
                        this.SundayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.MondayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.TuesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.WednesDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.ThursDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                        this.FirDayDate.push({ "Date": "", "Code": "", "ColorCode": "" });
                    }
                }
                this.getDaysFromWeek(i, '', true);
            }
        });
    }


    loadCurrentDate() {
        let curdate = new Date();
        this.selectedYearValue = curdate.getFullYear();

        this.getDaysArray(curdate.getMonth(), this.allMonths[curdate.getMonth()], true);
        let weekindex = [0];

        if (this.DayAndDate[curdate.getDate() - 1].Day == "SUN") {
            weekindex = this.SundayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())

                    return index;
            }).filter(isFinite);
        }
        else if (this.DayAndDate[curdate.getDate() - 1].Day == "MON") {
            weekindex = this.MondayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())
                    return index;
            }).filter(isFinite);
        }
        else if (this.DayAndDate[curdate.getDate() - 1].Day == "TUE") {
            weekindex = this.TuesDayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())
                    return index;
            }).filter(isFinite);
        }
        else if (this.DayAndDate[curdate.getDate() - 1].Day == "WED") {
            weekindex = this.WednesDayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())
                    return index;
            }).filter(isFinite);
        }
        else if (this.DayAndDate[curdate.getDate() - 1].Day == "THR") {
            weekindex = this.ThursDayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())
                    return index;
            }).filter(isFinite);
        }
        else if (this.DayAndDate[curdate.getDate() - 1].Day == "FRI") {
            weekindex = this.FirDayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())
                    return index;
            }).filter(isFinite);
        }
        else if (this.DayAndDate[curdate.getDate() - 1].Day == "SAT") {
            weekindex = this.SaturDayDate.map(function (obj, index) {
                if (obj.Date == this.curdate.getDate())
                    return index;
            }).filter(isFinite);
        }

    }
}