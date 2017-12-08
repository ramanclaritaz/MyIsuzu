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
            this.http.post(this.url+'GetAuthorityRequest',searchDataPagination).then(result=>{return result;}).catch(err=>{return {}; })
        }
        else{
            this.http.post(this.url+'GetAuthorityRequestForPlant',searchDataPagination).then(result=>{return result;}).catch(err=>{return {}; })
        }
    }

    getEditLeaveDetail(Id:any,isPlant:false):any {
        this.url=this.updateLeaveURL(isPlant);
        this.http.get(this.url+'GetEditForApplyleave?modelId='+Id).then(result=>{return result;}).catch(err=>{return {}; })
    }

    updateMultiApprovalforLeave(data:any,isPlant:false):any{
        this.url=this.updateLeaveURL(isPlant);
        this.http.post(this.url+'UpdateMultiApprovedStatus',data).then(result=>{return result;}).catch(err=>{return {}; })
            
    }

    getAllCompoffPendingApproval(searchDataPagination,isPlant?:false) {
        this.url=this.updateCompoffURL(isPlant);
        this.http.post(this.url+'GetCompOffAuthorityRequest',searchDataPagination).then(result=>{return result;}).catch(err=>{return {}; })
    }

    getEditCompoffDetail(Id:any,isPlant?:false) { 
        this.url=this.updateCompoffURL(isPlant);
            this.http.get(this.url+'GetCompOFFDetailsForEdit?modelId='+Id).then(result=>{return result;}).catch(err=>{return {}; })
    }

    updateMultiApprovalforCompoff(data:any,isPlant?:false){
        this.url=this.updateCompoffURL(isPlant);
        this.http.post(this.url+'UpdateMultiApprovedStatus',data).then(result=>{return result;}).catch(err=>{return {}; })
    }

    updateLeaveURL(isPlant:boolean):string{
        return this.url='/api'+((isPlant)?'/LeaveApplyingPlant/':'/LeaveApplying/');
    }

    updateCompoffURL(isPlant:boolean):string{
        return this.url='/api'+((isPlant)?'/CompensatoryOFFPlant/':'/CompensatoryOFF/');
    }

}