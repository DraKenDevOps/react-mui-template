import { lazy } from "react";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";


const RouteStaff = [

    {
        name: "Dashboard",
        path: "/dashboard",
        component: lazy(() => import("../pages/dashboard/home")),
        icon: faDashboard,
        exact: false,
    },
];

export default RouteStaff;
