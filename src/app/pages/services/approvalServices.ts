import { Injectable, Inject } from '@angular/core';

import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class approvalService {
    res: any;
    url: string = "";

    constructor( @Inject(httpService) private http: httpService) {

    }
    getAllLeavePendingApproval(searchDataPagination, isPlant: boolean): Observable<any> {

        this.url = this.updateLeaveURL(isPlant);
        if (!isPlant) {
            return this.http.post(this.url + 'GetAuthorityRequest', searchDataPagination);
        }
        else {
            return this.http.post(this.url + 'GetAuthorityRequestForPlant', searchDataPagination);
        }
    }

    getEditLeaveDetail(Id: any, isPlant): Observable<any> {
        this.url = this.updateLeaveURL(isPlant);
        return this.http.get(this.url + 'GetEditForApplyleave?modelId=' + Id);
    }

    EditLeaveApply(data: any, isPlant): Observable<any> {
        this.url = this.updateLeaveURL(isPlant);
        return this.http.post(this.url + 'EditLeaveApply', data);//.subscribe(result=>{return result;});

    }

    getAllCompoffPendingApproval(searchDataPagination, isPlant): Observable<any> {
        this.url = this.updateCompoffURL(isPlant);
        return this.http.post(this.url + 'GetCompOffAuthorityRequest', searchDataPagination);//.subscribe(result=>{return result;});
    }

    getEditCompoffDetail(Id: any, isPlant): Observable<any> {
        this.url = this.updateCompoffURL(isPlant);
        return this.http.get(this.url + 'GetCompOFFDetailsForEdit?modelId=' + Id);
    }

    updateMultiApprovalforCompoff(data: any, isPlant): Observable<any> {
        this.url = this.updateCompoffURL(isPlant);
        return this.http.post(this.url + 'UpdateMultiApprovedStatus', data);
    }

    private updateLeaveURL(isPlant: boolean): string {
        return this.url = '/api' + ((isPlant) ? '/LeaveApplyingPlant/' : '/LeaveApplying/');
    }

    private updateCompoffURL(isPlant: boolean): string {
        return this.url = '/api' + ((isPlant) ? '/CompensatoryOFFPlant/' : '/CompensatoryOFF/');
    }

}