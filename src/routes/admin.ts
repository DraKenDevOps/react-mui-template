import { lazy } from "react";
import { faDashboard, faBook } from "@fortawesome/free-solid-svg-icons";


const RouteAdmin = [
    {
        name: "Dashboard",
        path: "/dashboard",
        component: lazy(() => import("../pages/home")),
        icon: faDashboard,
        exact: false,
    },
    {
        name: "Applications",
        path: "/dashboard/application",
        component: lazy(() => import("../pages/applications")),
        icon: faBook,
        exact: false,
    },
];

export default RouteAdmin;
