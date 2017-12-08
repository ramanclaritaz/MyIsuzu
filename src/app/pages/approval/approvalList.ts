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
  pagenation:any;
  constructor(private approval:approvalService) {
    this.pagenation= {page:0,reverse:false,itemsPerPage:10,sortBy:'id',totalItems:64}
    this.Oninit();
  }

  Oninit()  {
    var result = this.approval.getAllLeavePendingApproval(this.pagenation,true);
    console.log(result);
    this.pendingList.push(result);
  }

  // loadMoreData(){
  //   this.com.searchPagination.page++;
  //   var result = this.approval.getAllLeavePendingApproval(this.com.searchPagination,true);
  //   this.com.searchPagination=result.searchPagination;
  //   this.pendingList.push(result);
  // }

 

}
