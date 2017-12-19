import { DateTime } from "ionic-angular/components/datetime/datetime";
import { httpService } from "./httpProvider";
import { Injectable, Inject } from "@angular/core";
import { Loading } from "ionic-angular/components/loading/loading";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { _ParseAST } from "@angular/compiler";

export interface searchPagination {
        page: Int32Array,
        itemsPerPage: Int32Array,
        sortBy: string,
        reverse: boolean,
        totalItems: Int32Array

};
export interface authentication {
        token: any,
        isAuth: boolean,
        userName: string,
        role: string,
        userid: string,
        userstate: string,
        companyid: string,
        userdepartcode: string,
        designationrole: string,
        displayname: string,
        employeenumbertype: string,
        locationid: string,
        isplantuser: boolean,
        isplantteamleader: boolean,
        isdualrole: boolean,
        istrainee: boolean
};

export interface iApprovalItem {
        appliedReason: string;
        appliedforDepartment: string;
        appliedforDivision: string;
        appliedforName: string;
        appliedforNumber: string;
        approvalStatus: any;
        approvername: string;
        createdDate: DateTime;
        fromDate: DateTime;
        id: any;
        leaveCode: string;
        leaveCodeDescription: string;
        toDate: DateTime;
        totaldays: any;
        comments: any;
        la1ApprovedStatus:number;
        la1ApprovedReason:string;
        la1ApprovedDate:any;

};
export interface employeeInfo {
        firstName: string;
        employeeNumber: string;
        divisionName: string;
        departmentName: string;
}
export interface comOffDay {
        appliedFor: string;
        isFullDay: any;
        totalCompOFF: any;
        fromDate: DateTime;
        toDate: DateTime;
        teamLeaderId: any;
}

export interface reportingList {
        teamleaderId: string;
        firstName: string;
        nameWithNumber: string
}
@Injectable()
export class commonService {
        private _auth: authentication;
        public get auth(): authentication {
                return this._auth;
        }
        public set auth(val: authentication) {
                this._auth = val;
        }
        private _employeeInfo: employeeInfo;
        public get employeeInfo(): employeeInfo {
                return this._employeeInfo;
        }
        public set employeeInfo(val: employeeInfo) {
                this._employeeInfo = val;
        }
        private _approvalItem: iApprovalItem
        public get approvalItem(): iApprovalItem {
                return this._approvalItem;
        }
        public set approvalItem(val: iApprovalItem) {
                this._approvalItem = val;
        }
        private _LAList: reportingList;
        public get LAList(): reportingList {
                return this._LAList;
        }
        public set LAList(val: reportingList) {
                this._LAList = val;
        }
        private _comOffDay: comOffDay;
        public get comOffDay(): comOffDay {
                return this._comOffDay;
        }
        public set comOffDay(val: comOffDay) {
                this._comOffDay = val;
        }
        private _TLList: reportingList;
        public get TLList(): reportingList {
                return this._TLList;
        }
        public set TLList(val: reportingList) {
                this._TLList = val;
        }
        private _pageTitle: string;

        public get pageTitle(): string {
                return this._pageTitle;
        }
        public set pageTitle(val: string) {
                this._pageTitle = val;
        }
        private _goBack: string;

        public get goBack(): string {
                return this._goBack;
        }
        public set goBack(val: string) {
                this._goBack = val;
        }
        constructor( @Inject(httpService) private http: httpService, private loadingCtrl: LoadingController) {

        }

        getEmployeeInfo() {
                this.http.get('/api/Employee/GetEmployeeInfo?userId=' + this.auth.userid).subscribe((result) => {
                        this.employeeInfo = result;
                }, (error) => { }
                );
        }
        getListOfTL() {
                this.http.get('/api/Employee/ListOfTL?userId=' + this.auth.userid).subscribe((result) => {
                        this.TLList = result;
                }, (error) => { });
        }


}

@Injectable()
export class Load {
        private _loading: Loading;

        constructor(private loadingCtrl: LoadingController) {

        }

        show() {
                this._loading = this.loadingCtrl.create({
                        content: 'Please wait...'
                });
                this._loading.present();
        }
        dismiss() {
                this._loading.dismiss();
        }
}

