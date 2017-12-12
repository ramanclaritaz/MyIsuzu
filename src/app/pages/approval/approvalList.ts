import { Component } from '@angular/core';
import { approvalService } from "../services/approvalServices";
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalList.html'
})

export class ApprovalList {

  pendingList: any = [];
  searchDataPagination: any;
  constructor(private approval: approvalService, private nav: NavController) {
    this.searchDataPagination = { page: null, reverse: false, itemsPerPage: null, sortBy: null, totalItems: 64 }
    this.Oninit();
  }

  Oninit() {
    this.approval.getAllLeavePendingApproval(this.searchDataPagination, false).subscribe(
      (result) => {
        this.searchDataPagination = result;
        this.pendingList = result.items;
      }, (err) => {
        alert('error occured on this page');
      });
  }

  editDetail($event, item) {
    this.nav.setRoot('approvalpage', { data: item });
  }

}
