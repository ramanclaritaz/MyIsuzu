import { DateTime } from "ionic-angular/components/datetime/datetime";

export interface searchPagination {
        page: Int32Array,
        itemsPerPage: Int32Array,
        sortBy: string,
        reverse: boolean,
        totalItems: Int32Array

};
export interface _authentication {
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

