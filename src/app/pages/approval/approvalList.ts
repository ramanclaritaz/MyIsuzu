import { Component } from '@angular/core';
import { approvalService } from "../services/approvalServices";
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { commonService, authentication } from '../services/common';

@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalList.html'
})

export class ApprovalList {

  pendingList: any = [];
  searchDataPagination: any;
  auth: authentication;
  constructor(private approval: approvalService, private nav: NavController, private globalVar: commonService) {
    this.searchDataPagination = { page: null, reverse: false, itemsPerPage: null, sortBy: null, totalItems: 64 }
    this.Oninit();
  }
  Oninit() {
    this.globalVar.goBack = 'dash';
    this.globalVar.pageTitle = 'Approval List';
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
    this.getPending();
  }
  getPending() {
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
