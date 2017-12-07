import { DeepLinkConfig } from 'ionic-angular';



import { loginPage } from './pages/login/login';
import { DashboardPage } from './pages/dashboard/dashboard';
import { ApprovalList } from "./pages/approval/approvalList";
import { leaveApply } from "./pages/apply/leaveApply";
import { compOffApply } from "./pages/apply/compOffApply";

export  const deepLinkConfig: DeepLinkConfig = {
  links: [
      { component: loginPage, name: "login", segment: "login"},
      { component: ApprovalList, name: "approval", segment: "approval"},
      { component: leaveApply, name: "leave", segment: "leave"},
      { component: compOffApply, name: "compoff", segment: "compoff"},
      { component: DashboardPage, name: "dash", segment: "dash" }
  ]
};