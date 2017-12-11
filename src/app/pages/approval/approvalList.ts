import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { approvalService } from "../services/approvalServices";
import { searchPagination } from '../services/common';


@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalList.html'
})

export class ApprovalList {
  pendingList:any=[];
  searchDataPagination:any;
  constructor(private approval:approvalService) {
    this.searchDataPagination= {page:null,reverse:false,itemsPerPage:null,sortBy:null,totalItems:64}
    this.Oninit();
  }

  Oninit()  {
    var result = this.approval.getAllLeavePendingApproval(this.searchDataPagination,false);

    console.log("Called");
     }

  // loadMoreData(){
  //   this.com.searchPagination.page++;
  //   var result = this.approval.getAllLeavePendingApproval(this.com.searchPagination,true);
  //   this.com.searchPagination=result.searchPagination;
  //   this.pendingList.push(result);
  // }

 

}
