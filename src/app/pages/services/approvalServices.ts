import { Injectable,Inject } from '@angular/core';
import { httpService } from "./httpProvider";

@Injectable()
export class approvalService {
  res:any;
  url:string="";
    constructor(@Inject(httpService) private http: httpService) {
        
        }
   
    
    getAllLeavePendingApproval(searchDataPagination,isPlant:boolean):any {
        
        this.url=this.updateLeaveURL(isPlant);
        if(!isPlant){
            this.http.post(this.url+'GetAuthorityRequest',searchDataPagination).subscribe(result=>{return result;});
        }
        else{
            this.http.post(this.url+'GetAuthorityRequestForPlant',searchDataPagination).subscribe(result=>{return result;});
        }
    }

    getEditLeaveDetail(Id:any,isPlant:false):any {
        this.url=this.updateLeaveURL(isPlant);
        this.http.get(this.url+'GetEditForApplyleave?modelId='+Id).subscribe(result=>{return result;});
    }

    updateMultiApprovalforLeave(data:any,isPlant:false):any{
        this.url=this.updateLeaveURL(isPlant);
        this.http.post(this.url+'UpdateMultiApprovedStatus',data).subscribe(result=>{return result;});
            
    }

    getAllCompoffPendingApproval(searchDataPagination,isPlant?:false) {
        this.url=this.updateCompoffURL(isPlant);
        this.http.post(this.url+'GetCompOffAuthorityRequest',searchDataPagination).subscribe(result=>{return result;});
    }

    getEditCompoffDetail(Id:any,isPlant?:false) { 
        this.url=this.updateCompoffURL(isPlant);
            this.http.get(this.url+'GetCompOFFDetailsForEdit?modelId='+Id).subscribe(result=>{return result;});
    }

    updateMultiApprovalforCompoff(data:any,isPlant?:false){
        this.url=this.updateCompoffURL(isPlant);
        this.http.post(this.url+'UpdateMultiApprovedStatus',data).subscribe(result=>{return result;});
    }

    updateLeaveURL(isPlant:boolean):string{
        return this.url='/api'+((isPlant)?'/LeaveApplyingPlant/':'/LeaveApplying/');
    }

    updateCompoffURL(isPlant:boolean):string{
        return this.url='/api'+((isPlant)?'/CompensatoryOFFPlant/':'/CompensatoryOFF/');
    }

}