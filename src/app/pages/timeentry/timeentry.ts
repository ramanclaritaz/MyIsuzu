import { Component } from '@angular/core';
import { timeEntryService } from "../services/timeEntryServices";
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { commonService, authentication, Load } from '../services/common';
import { Geolocation } from '@ionic-native/geolocation';
import { showMessage } from '../services/showalert';

@Component({
    selector: 'page-timeentry',
    templateUrl: '../timeentry/timeEntry.html'
})

export class timeEntry {
    TimeEntryRequests: any;
    isPunchIn: boolean;
    locationInfo1: any;
    btnText: any;
    locationInfo: any;
    timeEntryLocations: any;
    Emp_Info: any;
    auth: authentication;
    constructor(private timeService: timeEntryService, private nav: NavController, private globalVar: commonService, private geolocation: Geolocation, private show: showMessage, private loading: Load) {
        this.Oninit();

    }
    Oninit() {
        this.loading.show();
        this.globalVar.goBack = 'dash';
        this.globalVar.pageTitle = 'Time entry';
        this.timeEntryLocations = { latitude: '13.050784', longitude: '80.20953' };
        this.auth = this.globalVar.auth;
        if (this.auth == undefined) {
            this.nav.setRoot('login');
        }
        this.Emp_Info = this.globalVar.employeeInfo;
        this.getTimeEntry();
        this.btnText = (this.isPunchIn ? "TimeIn" : "TimeOut");
        this.loading.dismiss();
    }
    getTimeEntry() {
        this.timeService.getTimeEntry(this.auth.userid).subscribe((result) => {
            this.TimeEntryRequests = result;
            if (this.TimeEntryRequests == undefined || this.TimeEntryRequests == null) {
                this.isPunchIn = true;
                this.btnText = "TimeIn";
            }
            if (this.TimeEntryRequests != null && this.TimeEntryRequests.isEntryFromMobile == true && this.TimeEntryRequests.isInTime == false) {
                this.show.alert("Time Entry", "Already entered on this date.");
                this.nav.setRoot("dash");
            }
            else if (this.TimeEntryRequests != null && this.TimeEntryRequests.isEntryFromMobile == true && this.TimeEntryRequests.isInTime == true) {
                this.locationInfo1 = JSON.parse(this.TimeEntryRequests.inTimelocation);
                this.locationInfo1 = { latitude: this.locationInfo1.latitude, longitude: this.locationInfo1.longitude, address: this.locationInfo1.address };
                this.isPunchIn = false;
                this.btnText = "TimeOut";
            }
            else {
                this.isPunchIn = true;
                this.btnText = "TimeIn";
            }

        });
    }
    distance(p1, p2) {
        var theta = p1.longitude - p2.longitude;
        var dist = Math.sin(this.deg2rad(p1.latitude))
            * Math.sin(this.deg2rad(p2.latitude))
            + Math.cos(this.deg2rad(p1.latitude))
            * Math.cos(this.deg2rad(p2.latitude))
            * Math.cos(this.deg2rad(theta));
        dist = Math.acos(dist);
        dist = this.rad2deg(dist);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        console.log(dist);
        return dist;
    };
    deg2rad(deg) { return (deg * Math.PI / 180.0); };
    rad2deg(rad) { return (rad * 180 / Math.PI); };

    getMyLocation() {
        this.loading.show();
        this.geolocation.getCurrentPosition().then((resp) => {
            this.loading.dismiss();
            this.locationInfo = { latitude: resp.coords.latitude, longitude: resp.coords.longitude };
            if (this.isPunchIn == true) {
                this.getDistanceSuccess(true, this);
            }
            else if (this.isPunchIn == false) {
                this.calcDistance(1, this.checkCorporateOffice);
            }
            else
            {
                this.show.alert("Time Entry", "Time entry option not available.");
            }
        }, (error) => {
            this.loading.dismiss();
            console.log('Error getting location', error);
        });
    }
    calcDistance(km, callback) {
        let res;
        let distanceKm = this.distance(this.locationInfo1, this.timeEntryLocations);
        if (distanceKm <= km) {
            res = true;
            callback(res, this);
        }
        else {
            res = false;
            callback(res, this);
        }
    }

    getDistanceSuccess(result, val) {
        if (result) {
            val.PunchInOut();
        }
        else {
            val.show.alert("Time Entry", "Out-Time location mis-match with In-Time location!");
        }
    }

    PunchInOut() {
        let data = {
            userId: this.auth.userid,
            IsInTime: this.isPunchIn,
            Location: this.locationInfo
        }
        this.loading.show();
        this.timeService.timeEntry({ params: data }).subscribe((result) => {
            this.loading.dismiss();
            this.show.sucess('Time entry', 'Sucessfully saved');
            this.nav.setRoot('dash');
        }, err => {
            this.loading.dismiss();
        });
    }

    checkCorporateOffice(result, val) {
        if (result == false) {
            val.show.alert("Time Entry", "Time entry not allowed in corporate office!");
            val.nav.setRoot('dash');
        }
        else {
            var issite = false;
            for (var i = 0; i < this.timeEntryLocations.length; i++) {
                if ((Math.floor(this.locationInfo.latitude * 100) / 100 == Math.floor(this.timeEntryLocations[i].latitude * 100) / 100) &&
                    (Math.floor(this.locationInfo.longitude * 100) / 100 == Math.floor(this.timeEntryLocations[i].longitude * 100) / 100)) {

                    issite = true;
                    if (this.isPunchIn == true) {
                        val.PunchInOut();
                    }
                    else if (this.isPunchIn == false) {
                        val.calcDistance(1, this.getDistanceSuccess);
                    }
                    // break;
                    return false;
                }
            }
            if (!issite) {
                val.show.alert("Time Entry", "Time entry not allowed in this location");
                val.nav.setRoot('dash');
            }

        }
    }

}


