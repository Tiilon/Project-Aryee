/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Branches from "app/components/body/Branches";
import NewStaff from "app/components/body/NewStaff";
import Staff from "app/components/body/Staff";
import StaffDetails from "app/components/body/StaffDetails";
import Login from "app/components/Login";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "ni ni-key-25 text-info",
    component: Staff,
    layout: "/admin",
  },
  {
    path: "/staff-details/:uuid",
    name: "Staff",
    icon: "ni ni-key-25 text-info",
    component: StaffDetails,
    layout: "/admin",
  },
  {
    path: "/branches",
    name: "Branches",
    icon: "ni ni-key-25 text-info",
    component: Branches,
    layout: "/admin",
  },
  {
    path: "/new-staff",
    name: "New Staff",
    icon: "ni ni-key-25 text-info",
    component: NewStaff,
    layout: "/admin",
  },
];
export default routes;
