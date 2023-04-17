import { lazy } from "react";
import { faDashboard, faBook } from "@fortawesome/free-solid-svg-icons";


const RouteAdmin = [
    {
        name: "Dashboard",
        path: "/dashboard",
        component: lazy(() => import("../pages/dashboard/home")),
        icon: faDashboard,
        exact: false,
    },
    {
        name: "Address",
        path: "/dashboard/address",
        component: lazy(() => import("../pages/dashboard/project")),
        icon: faBook,
        exact: false,
    },
];

export default RouteAdmin;
