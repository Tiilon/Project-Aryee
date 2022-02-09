import Branches from "app/components/body/Branches";
import Staff from "app/components/body/Staff";


var items = [
  {
    path: "/branches",
    name: "Branches",
    icon: "fa fa-building text-info",
    component: Branches,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "fa fa-users  text-info",
    component: Staff,
    layout: "/admin",
  },
  ];
export default items;
