import { Injectable, Inject } from '@angular/core';

import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class approvalService {
  res: any;
  url: string = "";

  constructor(@Inject(httpService) private http: httpService) {

  }
  getAllLeavePendingApproval(searchDataPagination, isPlant): Observable<any> {

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
    return this.http.post(this.url + (isPlant ? 'EditPlantLeaveApply' : 'EditLeaveApply'), data);//.subscribe(result=>{return result;});

  }

  getAllCompoffPendingApproval(searchDataPagination, isPlant): Observable<any> {
    this.url = this.updateCompoffURL(isPlant);
    return this.http.post(this.url + 'GetCompOffAuthorityRequest', searchDataPagination);//.subscribe(result=>{return result;});
  }

  getEditCompoffDetail(Id: any, isPlant): Observable<any> {
    this.url = this.updateCompoffURL(isPlant);
    return this.http.get(this.url + 'GetCompOFFDetailsForEdit?modelId=' + Id);
  }
  getAllPreCompoffPendingApproval(searchDataPagination, isPlant): Observable<any> {
    return this.http.post('/api/PostCompensatoryOFFPlant/GetAuthorityRequestForPostCompoff', searchDataPagination);//.subscribe(result=>{return result;});
  }
  getEditPreCompoffDetail(Id: any, isPlant): Observable<any> {
    return this.http.get('/api/PostCompensatoryOFFPlant/GetPostCompOffEmployees?modelId=' + Id);
  }
  updateCompOff(data, isPlant): Observable<any> {
    this.url = this.updateCompoffURL(isPlant);
    return this.http.post(this.url + 'UpdateCompOff', data);
  }
  UpdatePostCompOff(data): Observable<any> {
    return this.http.post('/api/PostCompensatoryOFFPlant/UpdatePostCompOff', data);//.subscribe(result=>{return result;});
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
