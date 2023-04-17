import { lazy } from "react";


const RoutePublic = [

    {
        name: "login",
        path: "/",
        component: lazy(() => import("../pages/login")),
        exact: false,
    },


];

export default RoutePublic;
