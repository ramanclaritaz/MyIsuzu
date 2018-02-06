import { Component } from '@angular/core';
import { approvalService } from "../services/approvalServices";
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { commonService, authentication, Load, headerPage } from '../services/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalList.html'
})

export class ApprovalList {
  pendingList: any = [];
  searchDataPagination: any;
  auth: authentication;
  segmentVal: any;
  Item: any;
  headerData:headerPage;
  constructor(private approval: approvalService, navParam: NavParams, private nav: NavController, private globalVar: commonService, private loading: Load) {
    this.searchDataPagination = { page: null, reverse: false, itemsPerPage: null, sortBy: null, totalItems: 64 }
    //this.segmentVal = 1;
    this.Item = navParam.get('data');
    this.headerData = { page: 'dash', pageTitle: this.Item + ' Approval List', params: this.Item };
    this.Oninit();
  }
  Oninit() {
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
    console.log(this.Item);
    if (!this.auth.isplantteamleader || this.Item == 'Pre-compOff') {
      this.segmentChange();
    }
  }
  getLeavePending() {
    this.loading.show();
    this.approval.getAllLeavePendingApproval(this.searchDataPagination, ((this.segmentVal == 1) ? false : true)).subscribe(
      (result) => {
        this.searchDataPagination = result;
        this.pendingList = result.items;
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      });
  }
  getcomOffPending() {
    this.loading.show();
    this.approval.getAllCompoffPendingApproval(this.searchDataPagination, ((this.segmentVal == 1) ? false : true)).subscribe(
      (result) => {
        this.searchDataPagination = result;
        this.pendingList = result.items;
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      });
  }

  getPreComOffPending() {
    this.loading.show();
    this.approval.getAllPreCompoffPendingApproval(this.searchDataPagination, ((this.segmentVal == 0) ? false : true)).subscribe(
      (result) => {
        this.searchDataPagination = result;
        this.pendingList = result.items;
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      });
  }

  segmentChange() {
    this.searchDataPagination = { page: null, reverse: false, itemsPerPage: null, sortBy: null, totalItems: 64 }
    switch (this.Item) {
      case "Leave":
        this.getLeavePending();
        break;
      case "ComOff":
        this.getcomOffPending();
        break;
      case "Pre-compOff":
        this.getPreComOffPending();
        break;
    }
  }
  editDetail($event, item) {
    let val = {
      data:
        {
          item: item,
          plant: ((this.segmentVal == 1) ? false : true),
          type: this.Item
        }
    };
    this.nav.setRoot('approvalpage', val);
  }

}
