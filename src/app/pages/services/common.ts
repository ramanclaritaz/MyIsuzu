import { DateTime } from "ionic-angular/components/datetime/datetime";
import { httpService } from "./httpProvider";
import { Injectable, Inject } from "@angular/core";

export interface searchPagination {
        page: Int32Array,
        itemsPerPage: Int32Array,
        sortBy: string,
        reverse: boolean,
        totalItems: Int32Array

};
export interface authentication {
        token: any,
        isAuth: false,
        userName: "",
        role: "",
        userid: "",
        userstate: "",
        companyid: "",
        userdepartcode: "",
        designationrole: "",
        displayname: "",
        employeenumbertype: "",
        locationid: "",
        isplantuser: false,
        isplantteamleader: false,
        isdualrole: false,
        istrainee: false
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
        employeeWithNumber: string
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
        private _TLList: reportingList;
        public get TLList(): reportingList {
                return this._TLList;
        }
        public set TLList(val: reportingList) {
                this._TLList = val;
        }
        constructor(@Inject(httpService) private http: httpService) {
        }

        getEmployeeInfo() {
                this.http.get('/api/Employee/GetEmployeeInfo?userId=' + this.auth.userid).subscribe((result) => {
                        this.employeeInfo = result;
                });
        }
        getListOfTL() {
                this.http.get('/api/Employee/ListOfTL?userId=' + this.auth.userid).subscribe((result) => {
                        this.TLList = result;
                });
        }


}

